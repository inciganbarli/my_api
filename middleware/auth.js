const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware to check if user is logged in
const authenticate = (req, res, next) => {
  try {
    // get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided. Please login first." });
    }

    // token looks like "Bearer xxxxx", we need the xxxxx part
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format. Use: Bearer <token>" });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // save user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authenticate;
