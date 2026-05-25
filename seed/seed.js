require("dotenv").config();

const sequelize = require("../config/database");
const Movie = require("../models/Movie");
const movies = require("./movieData");

async function seedDatabase() {
  try {
    console.log("Connecting to database...");

    // sync database - force true will drop and recreate the table
    await sequelize.sync({ force: true });
    console.log("Database synced successfully!");

    console.log("Inserting " + movies.length + " movies...");

    // bulk insert all movies
    const createdMovies = await Movie.bulkCreate(movies);

    console.log("Successfully inserted " + createdMovies.length + " movies!");
    console.log("Seeding complete!");

    process.exit(0);
  } catch (error) {
    console.log("Error seeding database:");
    console.log(error.message);
    process.exit(1);
  }
}

seedDatabase();
