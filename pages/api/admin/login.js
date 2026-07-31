import bcrypt from "bcryptjs";
import { signSession, setSessionCookie } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const validEmail = email === process.env.ADMIN_EMAIL;
  const validPassword = validEmail
    ? await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH)
    : false;

  if (!validEmail || !validPassword) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = signSession({ email });
  setSessionCookie(res, token);

  return res.status(200).json({ success: true });
}
