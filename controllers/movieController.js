const Movie = require("../models/Movie");
const { redisClient } = require("../config/redis");

// Get all movies with pagination
const getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20; // max 20 movies per page
    const offset = (page - 1) * limit;

    // try to get from redis cache first
    const cacheKey = `movies_page_${page}`;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Serving from cache");
        return res.status(200).json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.log("Redis read error, skipping cache:", err.message);
    }

    // if not in cache, get from database
    const { count, rows: movies } = await Movie.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
    });

    const totalPages = Math.ceil(count / limit);

    const response = {
      movies,
      currentPage: page,
      totalPages,
      totalMovies: count,
    };

    // save to redis cache for 60 seconds
    try {
      await redisClient.setEx(cacheKey, 60, JSON.stringify(response));
    } catch (err) {
      console.log("Redis write error, skipping cache:", err.message);
    }

    res.status(200).json(response);
  } catch (error) {
    console.log("Get movies error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Get a single movie by id
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json(movie);
  } catch (error) {
    console.log("Get movie error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const { title, description, release_year, genre, rating, duration, director } = req.body;

    // basic validation
    if (!title || !release_year || !genre) {
      return res.status(400).json({ message: "Title, release_year, and genre are required." });
    }

    const movie = await Movie.create({
      title,
      description,
      release_year,
      genre,
      rating,
      duration,
      director,
    });

    // clear cache after creating
    await clearCache();

    res.status(201).json({ message: "Movie created!", movie });
  } catch (error) {
    console.log("Create movie error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    const { title, description, release_year, genre, rating, duration, director } = req.body;

    // update fields
    await movie.update({
      title: title || movie.title,
      description: description !== undefined ? description : movie.description,
      release_year: release_year || movie.release_year,
      genre: genre || movie.genre,
      rating: rating !== undefined ? rating : movie.rating,
      duration: duration !== undefined ? duration : movie.duration,
      director: director !== undefined ? director : movie.director,
    });

    // clear cache after updating
    await clearCache();

    res.status(200).json({ message: "Movie updated!", movie });
  } catch (error) {
    console.log("Update movie error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    await movie.destroy();

    // clear cache after deleting
    await clearCache();

    res.status(200).json({ message: "Movie deleted!" });
  } catch (error) {
    console.log("Delete movie error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// helper function to clear all movie cache keys
async function clearCache() {
  try {
    const keys = await redisClient.keys("movies_page_*");
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log("Cache cleared!");
    }
  } catch (err) {
    console.log("Error clearing cache:", err.message);
  }
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
