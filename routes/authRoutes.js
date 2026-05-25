const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("../config/passport");
const { register, login, getMe } = require("../controllers/authController");
const authenticate = require("../middleware/auth");
require("dotenv").config();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

// ---- GitHub OAuth Routes ----

/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Login with GitHub (OAuth)
 *     tags: [Auth]
 *     description: Redirects to GitHub for authentication
 *     responses:
 *       302:
 *         description: Redirects to GitHub login page
 */
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Auth]
 *     description: GitHub redirects here after login. Returns a JWT token.
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: GitHub authentication failed
 */
router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login-failed" }),
  (req, res) => {
    // user is now logged in via GitHub!
    // create a JWT token for them so they can use our API
    const token = jwt.sign(
      { id: req.user.id, username: req.user.username, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "GitHub login successful!",
      token,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  }
);

// if github login fails, show a simple error
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "GitHub login failed. Please try again." });
});

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 */
router.get("/me", authenticate, getMe);

module.exports = router;
