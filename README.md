# Movie API

A production-ready REST + GraphQL backend for managing movies, built with Node.js, Express, PostgreSQL, Redis, JWT & GitHub OAuth.

**Live URL:** https://my-api-n6ed.onrender.com

**Swagger Docs:** https://my-api-n6ed.onrender.com/api-docs

**GraphQL Playground:** https://my-api-n6ed.onrender.com/graphql

**Postman Collection:** https://www.postman.com/collections/movie-api-collection *(import from `postman/` folder)*

---

## Features

- Full CRUD on 1,050+ movies — REST and GraphQL
- JWT authentication (register / login)
- GitHub OAuth login via Passport.js
- Redis response caching (list pages: 60 s TTL, single movies: 5 min TTL)
- Pagination — max 20 movies per page
- Title search — `GET /movies?search=godfather`
- GraphQL queries **and** mutations with JWT auth guard
- `GET /me` — authenticated user profile
- Rate limiting — 200 requests / 15 minutes per IP
- Swagger UI interactive docs
- Docker & Docker Compose for local development
- Deployed to Render (free tier)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18 |
| Framework | Express.js |
| Database | PostgreSQL + Sequelize ORM |
| Cache & Sessions | Redis (connect-redis) |
| Auth | JWT (jsonwebtoken + bcryptjs) + GitHub OAuth (Passport.js) |
| API | REST + GraphQL (express-graphql) |
| Docs | Swagger (swagger-jsdoc + swagger-ui-express) |
| Rate Limiting | express-rate-limit |
| Containerization | Docker & Docker Compose |
| Hosting | Render.com |

---

## Project Structure

```
movie-api/
├── server.js                 # Entry point — wires all middleware and starts server
├── swagger.js                # Swagger / OpenAPI configuration
├── config/
│   ├── database.js           # Sequelize PostgreSQL connection
│   ├── redis.js              # Redis client
│   └── passport.js           # GitHub OAuth strategy
├── models/
│   ├── Movie.js              # Movie model (id, title, genre, rating, …)
│   ├── User.js               # User model (id, username, email, githubId, …)
│   └── index.js
├── controllers/
│   ├── authController.js     # register, login, getMe
│   └── movieController.js    # getAllMovies (+ search), getMovieById, CRUD
├── routes/
│   ├── authRoutes.js         # POST /register, POST /login, GET /me, GitHub OAuth
│   └── movieRoutes.js        # GET /movies, GET /movies/:id, POST, PUT, DELETE
├── middleware/
│   └── auth.js               # JWT verification middleware
├── graphql/
│   └── schema.js             # GraphQL schema — queries + mutations
├── seed/
│   ├── movieData.js          # 1,050+ movie records (60 hand-picked + generated)
│   └── seed.js               # Manual seed script (drops + recreates tables)
├── postman/
│   ├── Movie_API.postman_collection.json
│   ├── Movie_API.postman_environment.json         # Local environment
│   └── Movie_API_Production.postman_environment.json  # Render environment
├── public/
│   └── index.html            # Developer portal landing page
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Quick Start — Docker

```bash
git clone <repo-url>
cd movie-api

docker compose up --build
```

The API starts at `http://localhost:3000`. PostgreSQL is health-checked before the app boots; the database is seeded automatically with 1,050 movies on first run.

---

## Manual Installation

**Requirements:** Node.js 18+, PostgreSQL, Redis

```bash
# 1. Clone
git clone <repo-url>
cd movie-api

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your DB credentials and secrets

# 4. Create the database in PostgreSQL
# CREATE DATABASE moviedb;

# 5. Start the server (auto-seeds if empty)
npm run dev      # with auto-restart
npm start        # production
```

The first startup detects an empty database and seeds it automatically.

To force a full reseed (destroys existing data):
```bash
npm run seed
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `moviedb` |
| `DB_USER` | Database user | `postgres` |
| `DB_PASSWORD` | Database password | — |
| `DATABASE_URL` | Full connection string (overrides individual DB vars) | — |
| `JWT_SECRET` | Secret for signing JWTs | — |
| `SESSION_SECRET` | Secret for express-session | — |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `REDIS_URL` | Full Redis URL (overrides individual Redis vars) | — |
| `PORT` | HTTP port | `3000` |
| `GITHUB_CLIENT_ID` | GitHub OAuth App client ID | — |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App client secret | — |
| `GITHUB_CALLBACK_URL` | GitHub OAuth callback | `http://localhost:3000/auth/github/callback` |

---

## REST API Reference

### Public Routes (no authentication required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/movies` | Get movies (paginated, 20/page) |
| `GET` | `/movies?page=2` | Page 2 |
| `GET` | `/movies?search=godfather` | Search by title (case-insensitive) |
| `GET` | `/movies/:id` | Get movie by ID |
| `POST` | `/register` | Create a new account |
| `POST` | `/login` | Login → returns JWT token |
| `GET` | `/auth/github` | Start GitHub OAuth flow |

### Protected Routes (JWT token required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/me` | Current user profile |
| `POST` | `/movies` | Create a movie |
| `PUT` | `/movies/:id` | Update a movie (partial updates supported) |
| `DELETE` | `/movies/:id` | Delete a movie |

---

## Authentication

### Register

```bash
curl -X POST https://my-api-n6ed.onrender.com/register \
  -H "Content-Type: application/json" \
  -d '{"username": "john_doe", "email": "john@example.com", "password": "password123"}'
```

### Login

```bash
curl -X POST https://my-api-n6ed.onrender.com/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

Response:
```json
{ "message": "Login successful!", "token": "eyJhbGci..." }
```

### Use the token

```bash
curl -X POST https://my-api-n6ed.onrender.com/movies \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "Dune Part Three", "release_year": 2026, "genre": "Sci-Fi"}'
```

### GitHub OAuth

1. Open `https://my-api-n6ed.onrender.com/auth/github` in a browser
2. Authorise with your GitHub account
3. Receive a JWT token in the response

---

## GraphQL

Playground: `https://my-api-n6ed.onrender.com/graphql`

### Queries (public)

```graphql
# All movies (first 100)
{ movies { id title genre rating director release_year } }

# Single movie
{ movie(id: 1) { id title description rating duration } }

# By genre
{ moviesByGenre(genre: "Action") { id title rating } }
```

### Mutations (require JWT — pass `Authorization: Bearer <token>` header)

```graphql
# Create
mutation {
  createMovie(title: "New Film", release_year: 2025, genre: "Drama", rating: 8.0) {
    id title genre
  }
}

# Update
mutation {
  updateMovie(id: 5, rating: 9.2, title: "Updated Title") {
    id title rating
  }
}

# Delete
mutation { deleteMovie(id: 5) }
```

---

## Caching (Redis)

| Endpoint | Cache Key | TTL |
|----------|-----------|-----|
| `GET /movies?page=N&search=X` | `movies_page_N_search_X` | 60 s |
| `GET /movies/:id` | `movie_:id` | 300 s |

Cache is invalidated automatically on any write operation (create / update / delete).

---

## Rate Limiting

- **200 requests per 15 minutes** per IP address
- Returns `429 Too Many Requests` when exceeded

---

## Postman

Import both files from the `postman/` directory:

1. `Movie_API.postman_collection.json` — all requests
2. `Movie_API.postman_environment.json` — local (`http://localhost:3000`)
3. `Movie_API_Production.postman_environment.json` — production (`https://my-api-n6ed.onrender.com`)

**Workflow:**
1. Select the desired environment
2. Run **Register** to create an account
3. Run **Login** — the JWT token is saved automatically to `{{token}}`
4. All protected requests now work

---

## GitHub OAuth Setup

1. Go to **https://github.com/settings/developers** → OAuth Apps → New OAuth App
2. Fill in:
   - Homepage URL: `http://localhost:3000`
   - Callback URL: `http://localhost:3000/auth/github/callback`
3. Copy the **Client ID** and generate a **Client Secret**
4. Add to `.env`:
   ```env
   GITHUB_CLIENT_ID=your_id
   GITHUB_CLIENT_SECRET=your_secret
   GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback
   ```

---

## Deployment (Render.com)

### 1. Push to GitHub

```bash
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Create PostgreSQL on Render

New → PostgreSQL → Free plan → copy **Internal Database URL** → set as `DATABASE_URL` env var.

### 3. Create Redis on Render

New → Redis → Free plan → copy **Internal Redis URL** → set as `REDIS_URL` env var.

### 4. Deploy Web Service

New → Web Service → connect repo → configure:
- **Build:** `npm install`
- **Start:** `node server.js`

Add all environment variables from the table above.

### 5. Update GitHub OAuth callback

In your GitHub OAuth App settings, change the callback URL to:
```
https://<your-service>.onrender.com/auth/github/callback
```

---

## Docker Commands

```bash
docker compose up --build          # build and start
docker compose up --build -d       # background
docker compose down                # stop
docker compose down -v             # stop + delete database volume
docker compose logs -f app         # tail app logs
```

---

## License

ISC
