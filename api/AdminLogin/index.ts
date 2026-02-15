import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as bcrypt from "bcryptjs";
import { getAdminsClient, seedAdmins } from "../shared/tableStorage";
import { generateToken } from "../shared/auth";

export async function adminLogin(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("AdminLogin function processing request");

  if (request.method === "OPTIONS") {
    return {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }

  try {
    const { email, password } = (await request.json()) as any;

    if (!email || !password) {
      return {
        status: 400,
        jsonBody: { error: "Email and password are required" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    await seedAdmins();
    const adminsClient = await getAdminsClient();

    // Look up admin by email
    let admin: any = null;
    const adminsIter = adminsClient.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'ADMIN' and email eq '${email.toLowerCase()}'`,
      },
    });

    for await (const entity of adminsIter) {
      admin = entity;
      break;
    }

    if (!admin) {
      return {
        status: 401,
        jsonBody: { error: "Invalid email or password" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordValid) {
      return {
        status: 401,
        jsonBody: { error: "Invalid email or password" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    // Generate JWT token
    const token = generateToken(admin.email, "admin");

    return {
      status: 200,
      jsonBody: {
        success: true,
        token,
        admin: {
          name: admin.name,
          email: admin.email,
        },
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (error) {
    context.log("Error in admin login:", error);
    return {
      status: 500,
      jsonBody: { error: "Failed to process login request" },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}

app.http("AdminLogin", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "AdminLogin",
  handler: adminLogin,
});
