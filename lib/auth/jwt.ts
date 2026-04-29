import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "dev-secret-change");

export type SessionPayload = {
  userId: string;
  role: "OWNER" | "WORKER" | "ADMIN";
  name: string;
};

export async function signToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string) {
  const result = await jwtVerify(token, secret);
  return result.payload as SessionPayload;
}
