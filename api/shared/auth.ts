import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_in_production";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@pyrecrest.com";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";

export interface JWTPayload {
  email: string;
  role: string;
}

export function generateToken(email: string, role: string = "admin"): string {
  return jwt.sign({ email, role } as JWTPayload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  if (email !== ADMIN_EMAIL) {
    return false;
  }

  // If no hash is set, reject (security measure)
  if (!ADMIN_PASSWORD_HASH || ADMIN_PASSWORD_HASH === "$2a$10$placeholder_hash_here") {
    console.error("Admin password hash not configured!");
    return false;
  }

  try {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}

export function extractTokenFromHeader(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}

// Helper to generate password hash for setup
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
