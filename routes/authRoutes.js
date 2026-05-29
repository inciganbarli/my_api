const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("../config/passport");
const { register, login, getMe } = require("../controllers/authController");
const authenticate = require("../middleware/auth");
require("dotenv").config();


router.post("/register", register);


router.post("/login", login);




router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);


router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login-failed" }),
  (req, res) => {
    
    
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


router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "GitHub login failed. Please try again." });
});


router.get("/me", authenticate, getMe);

module.exports = router;
