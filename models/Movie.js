const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Movie model
const Movie = sequelize.define("Movie", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true,
  },
  director: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "movies",
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = Movie;
