import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { createUser, getUserByEmail } from "../services/firebaseService.js";
import { verifyToken } from "../middleware/auth.js";

const DISABLE_AUTH = process.env.DISABLE_AUTH === "true";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    if (DISABLE_AUTH) {
      return res.status(201).json({
        uid: "dev-user",
        email: req.body.email || "dev@example.com",
        name: req.body.name || "Dev User",
        token: "dev-token",
      });
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create user
    const uid = `user_${Date.now()}`;
    const user = {
      uid,
      email,
      name,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      timezone: "IST",
    };

    await createUser(user);

    // Generate token
    const token = jwt.sign(
      { uid, email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" }
    );

    res.status(201).json({
      uid,
      email,
      name,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    if (DISABLE_AUTH) {
      return res.json({
        uid: "dev-user",
        email: req.body.email || "dev@example.com",
        name: "Dev User",
        token: "dev-token",
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Find user
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { uid: user.uid, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" }
    );

    res.json({
      uid: user.uid,
      email: user.email,
      name: user.name,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Verify token
router.get("/verify", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;
