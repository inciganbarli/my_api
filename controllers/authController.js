const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide username, email, and password." });
    }

    // check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // check if username is taken
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Register error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    // find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Get the authenticated user's profile
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email", "createdAt"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Get me error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { register, login, getMe };
