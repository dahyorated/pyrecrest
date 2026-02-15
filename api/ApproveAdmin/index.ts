import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getAdminsClient } from "../shared/tableStorage";
import { verifyApprovalToken } from "../shared/auth";

export async function approveAdmin(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log("ApproveAdmin function processing request");

  const token = request.query.get("token");

  if (!token) {
    return {
      status: 400,
      headers: { "Content-Type": "text/html" },
      body: renderPage("Missing Token", "No approval token was provided.", false),
    };
  }

  try {
    const payload = verifyApprovalToken(token);
    if (!payload) {
      return {
        status: 400,
        headers: { "Content-Type": "text/html" },
        body: renderPage("Invalid or Expired Link", "This approval link is invalid or has expired. Please ask the admin to sign up again.", false),
      };
    }

    const adminsClient = await getAdminsClient();

    // Find admin by email
    let admin: any = null;
    const adminsIter = adminsClient.listEntities({
      queryOptions: {
        filter: `PartitionKey eq 'ADMIN' and email eq '${payload.email}'`,
      },
    });

    for await (const entity of adminsIter) {
      admin = entity;
      break;
    }

    if (!admin) {
      return {
        status: 404,
        headers: { "Content-Type": "text/html" },
        body: renderPage("Admin Not Found", "No admin account was found for this email address.", false),
      };
    }

    if (admin.status === "approved") {
      return {
        status: 200,
        headers: { "Content-Type": "text/html" },
        body: renderPage("Already Approved", `${admin.name} (${admin.email}) has already been approved.`, true),
      };
    }

    // Approve the admin
    await adminsClient.updateEntity(
      {
        partitionKey: admin.partitionKey,
        rowKey: admin.rowKey,
        status: "approved",
      },
      "Merge"
    );

    context.log(`Admin approved: ${admin.email}`);

    return {
      status: 200,
      headers: { "Content-Type": "text/html" },
      body: renderPage("Admin Approved!", `${admin.name} (${admin.email}) has been approved and can now log in to the Pyrecrest admin dashboard.`, true),
    };
  } catch (error) {
    context.log("Error approving admin:", error);
    return {
      status: 500,
      headers: { "Content-Type": "text/html" },
      body: renderPage("Error", "An error occurred while processing the approval. Please try again.", false),
    };
  }
}

function renderPage(title: string, message: string, success: boolean): string {
  const color = success ? "#10B981" : "#EF4444";
  const icon = success ? "&#10003;" : "&#10007;";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - Pyrecrest</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; background: #f3f4f6; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: white; border-radius: 12px; padding: 40px; max-width: 480px; width: 90%; text-align: center; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .icon { width: 64px; height: 64px; border-radius: 50%; background: ${color}; color: white; font-size: 32px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    h1 { color: #1f2937; margin: 0 0 12px; font-size: 24px; }
    p { color: #6b7280; line-height: 1.6; margin: 0; }
    .brand { color: #284498; font-weight: bold; margin-top: 24px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${title}</h1>
    <p>${message}</p>
    <p class="brand">Pyrecrest</p>
  </div>
</body>
</html>`;
}

app.http("ApproveAdmin", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "ApproveAdmin",
  handler: approveAdmin,
});
