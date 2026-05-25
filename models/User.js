const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true, // allow null for OAuth users (they don't have a password)
  },
  githubId: {
    type: DataTypes.STRING,
    allowNull: true, // only filled when user signs in with GitHub
    unique: true,
  },
}, {
  tableName: "users",
  timestamps: true,
});

module.exports = User;
