import { NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/session";
import { fail, ok } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!session) return fail("Unauthorized", 401);
  return ok(session);
}
