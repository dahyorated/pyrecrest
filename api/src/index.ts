import { app } from "@azure/functions";

const errors: string[] = [];

// Health/diagnostic endpoint - loads first, always available
app.http("Health", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "Health",
  handler: async () => ({
    status: 200,
    jsonBody: { status: "ok", errors, timestamp: new Date().toISOString() },
    headers: { "Access-Control-Allow-Origin": "*" },
  }),
});

const modules = [
  "../CreateBooking/index",
  "../GetBookings/index",
  "../UpdateBooking/index",
  "../CheckAvailability/index",
  "../AdminLogin/index",
  "../AdminSignup/index",
  "../ApproveAdmin/index",
];

for (const mod of modules) {
  try {
    require(mod);
  } catch (e: any) {
    errors.push(`${mod}: ${e.message}`);
  }
}
