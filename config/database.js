const { Sequelize } = require("sequelize");
require("dotenv").config();

// create connection to postgres database
let sequelize;

if (process.env.DATABASE_URL) {
  // connection string (ideal for production / Render)
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // necessary for hosting providers like Render
      },
    },
  });
} else {
  // fallback parameters (for local Docker development)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: "postgres",
      logging: false,
    }
  );
}

module.exports = sequelize;
