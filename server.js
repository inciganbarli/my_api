const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const swaggerUi = require("swagger-ui-express");
const { graphqlHTTP } = require("express-graphql");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const sequelize = require("./config/database");
const { redisClient, connectRedis } = require("./config/redis");
const passport = require("./config/passport");
const swaggerSpec = require("./swagger");
const graphqlSchema = require("./graphql/schema");
const Movie = require("./models/Movie");

// import routes
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

// create express app
const app = express();
const PORT = process.env.PORT || 3000;

// ---- Rate Limiting ----
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use(limiter);

// middleware
app.use(cors());
app.use(express.json());

// ---- Redis Session Setup ----
// this stores user sessions in Redis instead of memory
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:", // all session keys will start with "session:"
});

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // set to true if using https
    },
  })
);

// ---- Passport Setup ----
// initialize passport and connect it to sessions
app.use(passport.initialize());
app.use(passport.session());

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ---- GraphQL Endpoint ----
// Optionally decode JWT so mutations can check req.user in the context
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (_) {}
    }
  }
  next();
};

app.use(
  "/graphql",
  optionalAuth,
  graphqlHTTP((req) => ({
    schema: graphqlSchema,
    graphiql: true,
    context: { user: req.user || null },
  }))
);

// routes
app.use("/", authRoutes);
app.use("/movies", movieRoutes);

// home route
app.get("/", (req, res) => {
  // If the browser requests HTML, serve our premium developer portal dashboard!
  if (req.accepts("html")) {
    const path = require("path");
    return res.sendFile(path.join(__dirname, "public", "index.html"));
  }

  // Otherwise fall back to returning standard JSON for API clients
  res.json({
    message: "Welcome to the Movie API!",
    docs: "/api-docs",
    graphql: "/graphql",
    routes: {
      movies: "/movies",
      register: "/register",
      login: "/login",
      github_oauth: "/auth/github",
    },
  });
});

// start the server
async function startServer() {
  try {
    // connect to database
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL!");

    // sync database (creates tables if they don't exist)
    await sequelize.sync();
    console.log("Database synced!");

    // Check if seeding is needed
    const movieCount = await Movie.count();
    if (movieCount === 0) {
      console.log("No movies found in database. Seeding database programmatically...");
      const movies = require("./seed/movieData");
      await Movie.bulkCreate(movies);
      console.log(`Successfully seeded ${movies.length} movies!`);
    } else {
      console.log(`Database already seeded. Found ${movieCount} movies.`);
    }

    // connect to redis
    await connectRedis();

    // start listening
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
      console.log(`GraphQL playground at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.log("Failed to start server:", error.message);
  }
}

startServer();
