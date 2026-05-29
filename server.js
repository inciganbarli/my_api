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


const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");


const app = express();
const PORT = process.env.PORT || 3000;


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use(limiter);


app.use(cors());
app.use(express.json());



const redisStore = new RedisStore({
  client: redisClient,
  prefix: "session:", 
});

app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, 
      secure: false, 
    },
  })
);



app.use(passport.initialize());
app.use(passport.session());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



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


app.use("/", authRoutes);
app.use("/movies", movieRoutes);


app.get("/", (req, res) => {
  
  if (req.accepts("html")) {
    const path = require("path");
    return res.sendFile(path.join(__dirname, "public", "index.html"));
  }

  
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


async function startServer() {
  try {
    
    await sequelize.authenticate();
    console.log("Connected to PostgreSQL!");

    
    await sequelize.sync();
    console.log("Database synced!");

    
    const movieCount = await Movie.count();
    if (movieCount === 0) {
      console.log("No movies found in database. Seeding database programmatically...");
      const movies = require("./seed/movieData");
      await Movie.bulkCreate(movies);
      console.log(`Successfully seeded ${movies.length} movies!`);
    } else {
      console.log(`Database already seeded. Found ${movieCount} movies.`);
    }

    
    void connectRedis();

    
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
