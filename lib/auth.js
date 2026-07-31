import jwt from "jsonwebtoken";

const COOKIE_NAME = "postman_admin_session";
const SESSION_HOURS = 12;

export function signSession(payload) {
  return jwt.sign(payload, process.env.ADMIN_JWT_SECRET, {
    expiresIn: `${SESSION_HOURS}h`,
  });
}

export function verifySession(token) {
  try {
    return jwt.verify(token, process.env.ADMIN_JWT_SECRET);
  } catch {
    return null;
  }
}

export function setSessionCookie(res, token) {
  const isProd = process.env.NODE_ENV === "production";
  res.setHeader(
    "Set-Cookie",
    [
      `${COOKIE_NAME}=${token}`,
      "HttpOnly",
      "Path=/",
      `Max-Age=${SESSION_HOURS * 3600}`,
      "SameSite=Strict",
      isProd ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; ")
  );
}

export function clearSessionCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
  );
}

export function getSessionFromReq(req) {
  const cookieHeader = req.headers.cookie || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!match) return null;
  const token = match.split("=")[1];
  return verifySession(token);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
