# Welcome to My Api

## Task
Build and deploy a production-ready movie API with REST endpoints, GraphQL, authentication, caching, and Docker support. The main challenge was connecting the backend to PostgreSQL/Redis, making the app start reliably, and deploying it to Render.

## Description
This project was solved by creating an Express + Sequelize backend for movie management, adding JWT authentication and GitHub OAuth, exposing Swagger and GraphQL docs, seeding the database automatically, and deploying the finished application to Render at https://my-api-n6ed.onrender.com/.

## Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file and set the required variables for PostgreSQL, Redis, and JWT/GitHub OAuth.
3. Start the project locally:
   ```bash
   npm start
   ```
   Or use Docker:
   ```bash
   docker compose up --build
   ```

## Usage
The API is already deployed here:
https://my-api-n6ed.onrender.com/

Local development:
- Swagger UI: http://localhost:3000/api-docs
- GraphQL Playground: http://localhost:3000/graphql
- Main API: http://localhost:3000/movies

Example:
```bash
curl http://localhost:3000/movies
```

```bash
./my_project argument1 argument2
```

## Deployment
This project is deployed on Render and available at:
https://my-api-n6ed.onrender.com/

To deploy your own version:
1. Push the project to GitHub.
2. Create a Render web service and connect the repository.
3. Set the required environment variables such as DATABASE_URL, REDIS_URL, JWT_SECRET, and GitHub OAuth credentials.
4. Start the service with the command:
   ```bash
   npm start
   ```

## The Core Team
Made at Qwasar SV -- Software Engineering School <img alt='Qwasar SV -- Software Engineering School's Logo' src='https://storage.googleapis.com/qwasar-public/qwasar-logo_50x50.png' width='20px' />
