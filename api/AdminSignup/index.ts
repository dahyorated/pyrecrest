import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getAdminsClient } from "../shared/tableStorage";
import { hashPassword, generateApprovalToken } from "../shared/auth";
import { sendAdminApprovalEmail } from "../shared/email";

export async function adminSignup(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("AdminSignup function processing request");

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
    const { name, email, password } = (await request.json()) as any;

    // Validate input
    if (!name || !email || !password) {
      return {
        status: 400,
        jsonBody: { error: "Name, email, and password are required" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    if (password.length < 8) {
      return {
        status: 400,
        jsonBody: { error: "Password must be at least 8 characters" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        status: 400,
        jsonBody: { error: "Invalid email address" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    const adminsClient = await getAdminsClient();

    // Check if email already exists
    const existingAdmins = adminsClient.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'ADMIN' and email eq '${email}'`,
      },
    });

    for await (const _ of existingAdmins) {
      return {
        status: 409,
        jsonBody: { error: "An account with this email already exists" },
        headers: { "Access-Control-Allow-Origin": "*" },
      };
    }

    // Hash password and create admin
    const passwordHash = await hashPassword(password);
    const rowKey = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    await adminsClient.createEntity({
      partitionKey: "ADMIN",
      rowKey,
      name,
      email: email.toLowerCase(),
      passwordHash,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    // Send approval email
    try {
      const approvalToken = generateApprovalToken(email.toLowerCase());
      await sendAdminApprovalEmail(name, email, approvalToken);
    } catch (emailError) {
      context.log("Error sending approval email:", emailError);
      // Don't fail signup if email fails — admin can be approved manually
    }

    return {
      status: 201,
      jsonBody: {
        success: true,
        message: "Signup request submitted. You will receive an email once your account is approved.",
      },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  } catch (error) {
    context.log("Error in admin signup:", error);
    return {
      status: 500,
      jsonBody: { error: "Failed to process signup request" },
      headers: { "Access-Control-Allow-Origin": "*" },
    };
  }
}

app.http("AdminSignup", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "AdminSignup",
  handler: adminSignup,
});
