import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Ensure env is loaded even when middleware is imported standalone
dotenv.config({ path: new URL("../../.env.local", import.meta.url) });

// Default to disabled unless explicitly set to "false"
const DISABLE_AUTH = process.env.DISABLE_AUTH !== "false";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (DISABLE_AUTH || !token) {
    req.user = {
      uid: "dev-user",
      email: "dev@example.com",
      name: "Dev User",
    };
    return next();
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
}
