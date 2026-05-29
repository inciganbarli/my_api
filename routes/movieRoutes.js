const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");


router.get("/", getAllMovies);


router.get("/:id", getMovieById);


router.post("/", authenticate, createMovie);


router.put("/:id", authenticate, updateMovie);


router.delete("/:id", authenticate, deleteMovie);

module.exports = router;
