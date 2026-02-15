import { app } from "@azure/functions";

// Health check - no dependencies on shared modules
app.http("Health", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "Health",
  handler: async () => ({
    status: 200,
    jsonBody: { status: "ok", timestamp: new Date().toISOString() },
    headers: { "Access-Control-Allow-Origin": "*" },
  }),
});

import '../CreateBooking/index';
import '../GetBookings/index';
import '../UpdateBooking/index';
import '../CheckAvailability/index';
import '../AdminLogin/index';
import '../AdminSignup/index';
import '../ApproveAdmin/index';
