import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { HttpRequest, HttpResponseInit } from "@azure/functions";

export interface JWTPayload {
  email: string;
  role: string;
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "your_jwt_secret_here_change_in_production") {
    throw new Error("JWT_SECRET environment variable is not properly configured");
  }
  return secret;
}

export function generateToken(email: string, role: string = "admin"): string {
  return jwt.sign({ email, role } as JWTPayload, getJwtSecret(), {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function generateApprovalToken(email: string): string {
  return jwt.sign({ email, purpose: "admin_approval" }, getJwtSecret(), {
    expiresIn: "24h",
  });
}

export function verifyApprovalToken(token: string): { email: string; purpose: string } | null {
  try {
    const payload = jwt.verify(token, getJwtSecret()) as any;
    if (payload.purpose !== "admin_approval") return null;
    return payload;
  } catch {
    return null;
  }
}

export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

export function requireAuth(request: HttpRequest): { valid: true; payload: JWTPayload } | { valid: false; response: HttpResponseInit } {
  const authHeader = request.headers.get("authorization");
  const token = extractTokenFromHeader(authHeader || undefined);

  if (!token) {
    return {
      valid: false,
      response: {
        status: 401,
        jsonBody: { error: "Authentication required" },
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    };
  }

  const payload = verifyToken(token);
  if (!payload) {
    return {
      valid: false,
      response: {
        status: 401,
        jsonBody: { error: "Invalid or expired token" },
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    };
  }

  return { valid: true, payload };
}

// Helper to generate password hash for setup
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
