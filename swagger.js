const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description: "A simple Movie API with CRUD, Auth, Redis Cache, and PostgreSQL",
    },
    servers: [
      {
        url: "https://my-api-n6ed.onrender.com",
        description: "Production server (Render)",
      },
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // look for swagger comments in route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
