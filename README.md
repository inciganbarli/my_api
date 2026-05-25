# 🎬 Movie API

A simple REST + GraphQL API for managing movies, built with Node.js, Express, PostgreSQL, Redis, JWT & GitHub OAuth authentication.

> 🌐 **Live Demo:** https://my-api-n6ed.onrender.com

---

## Features

- ✅ Full CRUD operations for movies (REST API)
- ✅ GraphQL interface for querying movies
- ✅ JWT authentication (register & login)
- ✅ GitHub OAuth login
- ✅ PostgreSQL database with Sequelize ORM
- ✅ Redis session caching
- ✅ Redis caching for API responses
- ✅ Pagination (20 movies per page)
- ✅ Swagger API documentation
- ✅ Docker support
- ✅ 1000+ movie records (seed data)
- ✅ Postman collection included

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Cache & Sessions:** Redis (connect-redis)
- **Auth:** JWT (jsonwebtoken + bcryptjs) + GitHub OAuth (Passport.js)
- **API:** REST + GraphQL (express-graphql)
- **Docs:** Swagger (swagger-ui-express + swagger-jsdoc)
- **Containerization:** Docker & Docker Compose

---

## Project Structure

```
movie-api/
├── server.js                # Main entry point
├── swagger.js               # Swagger configuration
├── config/
│   ├── database.js          # PostgreSQL connection
│   ├── redis.js             # Redis connection
│   └── passport.js          # GitHub OAuth strategy
├── models/
│   ├── Movie.js             # Movie model
│   ├── User.js              # User model
│   └── index.js             # Export all models
├── controllers/
│   ├── authController.js    # Register & Login logic
│   └── movieController.js   # Movie CRUD logic
├── routes/
│   ├── authRoutes.js        # Auth + OAuth routes
│   └── movieRoutes.js       # Movie routes
├── middleware/
│   └── auth.js              # JWT auth middleware
├── graphql/
│   └── schema.js            # GraphQL schema & resolvers
├── seed/
│   ├── movieData.js         # 1000+ movie records
│   └── seed.js              # Database seed script
├── postman/
│   ├── Movie_API.postman_collection.json
│   └── Movie_API.postman_environment.json
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
├── .env.example
└── README.md
```

---

## Quick Start with Docker 🐳

The easiest way to run the project:

```bash
# Clone the project
git clone <your-repo-url>
cd movie-api

# Run everything with Docker
docker compose up --build
```

That's it! The API will be running at `http://localhost:3000`

The database will be automatically seeded with 1000+ movies on first run.

---

## Manual Installation (without Docker)

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis

### Steps

1. **Clone the repo**
```bash
git clone <your-repo-url>
cd movie-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials and GitHub OAuth keys
```

4. **Make sure PostgreSQL and Redis are running**

5. **Create the database**
```sql
CREATE DATABASE moviedb;
```

6. **Seed the database**
```bash
npm run seed
```

7. **Start the server**
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server will start at `http://localhost:3000`

---

## GitHub OAuth Setup (Step-by-Step)

To use the "Login with GitHub" feature, you need to create a GitHub OAuth App:

### Step 1: Go to GitHub Developer Settings

1. Go to https://github.com/settings/developers
2. Click **"OAuth Apps"** in the left sidebar
3. Click **"New OAuth App"**

### Step 2: Fill in the form

| Field | Value |
|-------|-------|
| Application name | `Movie API` (or any name you want) |
| Homepage URL | `http://localhost:3000` |
| Authorization callback URL | `http://localhost:3000/auth/github/callback` |

### Step 3: Get your credentials

1. After creating the app, you'll see your **Client ID**
2. Click **"Generate a new client secret"** to get your **Client Secret**

### Step 4: Add to your `.env` file

```env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
```

### Step 5: Test it!

Open your browser and go to: `http://localhost:3000/auth/github`

You will be redirected to GitHub to login. After logging in, you'll get a JWT token back!

---

## API Documentation

### Swagger (REST API)

Once the server is running, visit:

👉 **http://localhost:3000/api-docs**

### GraphQL Playground

Visit the interactive GraphQL playground:

👉 **http://localhost:3000/graphql**

---

## REST API Routes

### Public Routes (no auth needed)

| Method | Endpoint       | Description              |
|--------|---------------|--------------------------|
| GET    | /movies       | Get all movies (paginated)|
| GET    | /movies/:id   | Get a movie by ID        |
| POST   | /register     | Register a new user      |
| POST   | /login        | Login and get JWT token  |
| GET    | /auth/github  | Login with GitHub OAuth  |

### Protected Routes (need JWT token)

| Method | Endpoint       | Description              |
|--------|---------------|--------------------------|
| POST   | /movies       | Create a new movie       |
| PUT    | /movies/:id   | Update a movie           |
| DELETE | /movies/:id   | Delete a movie           |

### Pagination

```
GET /movies?page=1    # First 20 movies
GET /movies?page=2    # Movies 21-40
GET /movies?page=3    # Movies 41-60
```

---

## GraphQL Queries

Visit `http://localhost:3000/graphql` and try these queries:

### Get all movies

```graphql
{
  movies {
    id
    title
    genre
    rating
    director
    release_year
  }
}
```

### Get a movie by ID

```graphql
{
  movie(id: 1) {
    id
    title
    description
    genre
    rating
    duration
    director
  }
}
```

### Get movies by genre

```graphql
{
  moviesByGenre(genre: "Action") {
    id
    title
    rating
    director
  }
}
```

---

## Authentication Usage

### Option 1: Email & Password

#### 1. Register a new user

```bash
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 2. Login to get a token

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Option 2: GitHub OAuth

1. Open `http://localhost:3000/auth/github` in your browser
2. Login with your GitHub account
3. You'll get a JWT token in the response

### 3. Use the token for protected routes

```bash
curl -X POST http://localhost:3000/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My Movie",
    "description": "A great movie",
    "release_year": 2024,
    "genre": "Action",
    "rating": 8.5,
    "duration": 120,
    "director": "John Smith"
  }'
```

---

## Using Postman

1. Import the collection from `postman/Movie_API.postman_collection.json`
2. Import the environment from `postman/Movie_API.postman_environment.json`
3. Select the "Movie API - Local" environment
4. Run the "Register" request first
5. Run the "Login" request — the token is automatically saved
6. Now you can use all the protected routes!
7. Try the GraphQL requests in the "GraphQL" folder!

---

## Docker Commands

```bash
# Start all services
docker compose up --build

# Start in background
docker compose up --build -d

# Stop all services
docker compose down

# Stop and remove volumes (reset database)
docker compose down -v

# View logs
docker compose logs -f app

# Rebuild after code changes
docker compose up --build
```

---

## Deployment to Render.com

### 1. Push your code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Set up PostgreSQL on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **PostgreSQL**
3. Give it a name (e.g., `movie-db`)
4. Choose the **Free** plan
5. Click **Create Database**
6. Copy the **Internal Database URL** and note the host, port, username, password, and database name

### 3. Set up Redis on Render

1. Click **New** → **Redis**
2. Give it a name (e.g., `movie-redis`)
3. Choose the **Free** plan
4. Click **Create Redis**
5. Copy the **Internal Redis URL** and note the host and port

### 4. Deploy the Web Service

1. Click **New** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name:** movie-api
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node seed/seed.js && node server.js`
4. Add **Environment Variables:**
   - `DB_HOST` → from your Render PostgreSQL
   - `DB_PORT` → 5432
   - `DB_NAME` → from your Render PostgreSQL
   - `DB_USER` → from your Render PostgreSQL
   - `DB_PASSWORD` → from your Render PostgreSQL
   - `JWT_SECRET` → (create a random string)
   - `SESSION_SECRET` → (create a random string)
   - `REDIS_HOST` → from your Render Redis
   - `REDIS_PORT` → 6379
   - `PORT` → 3000
   - `GITHUB_CLIENT_ID` → from your GitHub OAuth App
   - `GITHUB_CLIENT_SECRET` → from your GitHub OAuth App
   - `GITHUB_CALLBACK_URL` → `https://your-app-name.onrender.com/auth/github/callback`
5. Click **Create Web Service**

### 5. Update the GitHub OAuth callback URL

Go back to your GitHub OAuth App settings and update the **Authorization callback URL** to:
```
https://your-app-name.onrender.com/auth/github/callback
```

### 6. Test your deployment

- REST API docs: `https://your-app-name.onrender.com/api-docs`
- GraphQL playground: `https://your-app-name.onrender.com/graphql`
- GitHub login: `https://your-app-name.onrender.com/auth/github`

---

## Environment Variables

| Variable             | Description                         | Default           |
|---------------------|-------------------------------------|--------------------|
| DB_HOST             | PostgreSQL host                     | localhost          |
| DB_PORT             | PostgreSQL port                     | 5432               |
| DB_NAME             | Database name                       | moviedb            |
| DB_USER             | Database username                   | postgres           |
| DB_PASSWORD         | Database password                   | postgres123        |
| JWT_SECRET          | Secret key for JWT tokens           | -                  |
| SESSION_SECRET      | Secret key for sessions             | -                  |
| REDIS_HOST          | Redis host                          | localhost          |
| REDIS_PORT          | Redis port                          | 6379               |
| PORT                | Server port                         | 3000               |
| GITHUB_CLIENT_ID    | GitHub OAuth App client ID          | -                  |
| GITHUB_CLIENT_SECRET| GitHub OAuth App client secret      | -                  |
| GITHUB_CALLBACK_URL | GitHub OAuth callback URL           | http://localhost:3000/auth/github/callback |

---

## License

ISC
