const { Op } = require("sequelize");
const Movie = require("../models/Movie");
const { redisClient } = require("../config/redis");

// Get all movies with pagination and optional search
const getAllMovies = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 20;
    const offset = (page - 1) * limit;
    const search = req.query.search ? req.query.search.trim() : "";

    const cacheKey = `movies_page_${page}_search_${search}`;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.log("Redis read error, skipping cache:", err.message);
    }

    const whereClause = search
      ? { title: { [Op.iLike]: `%${search}%` } }
      : {};

    const { count, rows: movies } = await Movie.findAndCountAll({
      where: whereClause,
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
      search: search || null,
    };

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
    const cacheKey = `movie_${req.params.id}`;

    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
      }
    } catch (err) {
      console.log("Redis read error, skipping cache:", err.message);
    }

    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    try {
      await redisClient.setEx(cacheKey, 300, JSON.stringify(movie));
    } catch (err) {
      console.log("Redis write error, skipping cache:", err.message);
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

    if (!title || !release_year || !genre) {
      return res.status(400).json({ message: "title, release_year, and genre are required." });
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

    await clearCache();

    res.status(201).json({ message: "Movie created!", movie });
  } catch (error) {
    console.log("Create movie error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Update a movie (full or partial)
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    const { title, description, release_year, genre, rating, duration, director } = req.body;

    await movie.update({
      title: title !== undefined ? title : movie.title,
      description: description !== undefined ? description : movie.description,
      release_year: release_year !== undefined ? release_year : movie.release_year,
      genre: genre !== undefined ? genre : movie.genre,
      rating: rating !== undefined ? rating : movie.rating,
      duration: duration !== undefined ? duration : movie.duration,
      director: director !== undefined ? director : movie.director,
    });

    await clearCache(req.params.id);

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
    await clearCache(req.params.id);

    res.status(200).json({ message: "Movie deleted!" });
  } catch (error) {
    console.log("Delete movie error:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// clear all movie page cache keys and optionally the single-movie key
async function clearCache(movieId) {
  try {
    const pageKeys = await redisClient.keys("movies_page_*");
    if (pageKeys.length > 0) await redisClient.del(pageKeys);
    if (movieId) {
      await redisClient.del(`movie_${movieId}`);
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
