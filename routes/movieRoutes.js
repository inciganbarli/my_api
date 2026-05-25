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

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies (paginated)
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get("/", getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie (requires auth)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - release_year
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: The Matrix
 *               description:
 *                 type: string
 *                 example: A computer hacker learns about the true nature of reality
 *               release_year:
 *                 type: integer
 *                 example: 1999
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               rating:
 *                 type: number
 *                 example: 8.7
 *               duration:
 *                 type: integer
 *                 example: 136
 *               director:
 *                 type: string
 *                 example: The Wachowskis
 *     responses:
 *       201:
 *         description: Movie created
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie (requires auth)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               release_year:
 *                 type: integer
 *               genre:
 *                 type: string
 *               rating:
 *                 type: number
 *               duration:
 *                 type: integer
 *               director:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie updated
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authenticate, updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie (requires auth)
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie deleted
 *       404:
 *         description: Movie not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authenticate, deleteMovie);

module.exports = router;
