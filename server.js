const express = require("express");
const cors = require("cors");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const swaggerUi = require("swagger-ui-express");
const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const sequelize = require("./config/database");
const { redisClient, connectRedis } = require("./config/redis");
const passport = require("./config/passport");
const swaggerSpec = require("./swagger");
const graphqlSchema = require("./graphql/schema");

// import routes
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");

// create express app
const app = express();
const PORT = process.env.PORT || 3000;

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
// graphiql: true gives us a nice UI to test queries in the browser
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true, // enables the GraphiQL interface at /graphql
  })
);

// routes
app.use("/", authRoutes);
app.use("/movies", movieRoutes);

// home route
app.get("/", (req, res) => {
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
