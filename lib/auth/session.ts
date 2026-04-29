import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export async function getSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get("kaamsetu_token")?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export async function getSessionFromCookies() {
  const token = (await cookies()).get("kaamsetu_token")?.value;
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}
