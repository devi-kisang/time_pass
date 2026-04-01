# 🎬 TimePass Streaming

A self-hosted video streaming platform built to demonstrate full-stack development and DevOps engineering. Runs live in production on an Azure VM with automated CI/CD deployment.

**Live:** [kisang.tech](https://kisang.tech)

---

## Architecture

```
Browser
   │
   ▼
Nginx (reverse proxy, port 80/443)
   ├──► React Frontend  (port 3000 internally)
   └──► FastAPI Backend (port 8000 internally)
              │
              ▼
       /var/www/videos   (MP4 files served by Nginx)
       /var/www/posters  (Poster images)
```

Both services run as Docker containers managed by Docker Compose. GitHub Actions handles automated build and deployment on every push to `main`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Create React App, multi-stage Docker build |
| Backend | FastAPI, Uvicorn, Python 3.11 |
| Metrics | Prometheus (via `prometheus-fastapi-instrumentator`) |
| Containerization | Docker, Docker Compose |
| CI/CD | GitHub Actions → GHCR → SSH deploy to Azure VM |
| Reverse Proxy | Nginx |
| Cloud | Azure Virtual Machine (Ubuntu) |

---

## Features

- Movie catalog dynamically built from files on disk — no database required
- Video streaming served directly by Nginx for performance
- Token-protected upload endpoint for adding new content
- `/metrics` endpoint exposing Prometheus-compatible application metrics
- Legal disclaimer modal on first visit
- About page served from backend API (`/api/info/`)
- Health check endpoint (`/api/`)
- Zero-downtime deploys via GitHub Actions SSH pipeline

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/` | Health check |
| `GET` | `/api/movies/` | List all available movies |
| `GET` | `/api/info/` | Project metadata |
| `POST` | `/api/upload/` | Upload a new MP4 (requires `x-token` header) |
| `GET` | `/metrics` | Prometheus metrics |

---

## Local Setup

### Prerequisites

- Docker and Docker Compose installed
- Git

### Run locally

```bash
git clone https://github.com/devi-kisang/time_pass.git
cd time_pass

# Create environment file
cp .env.example .env
# Edit .env and set your ADMIN_TOKEN

docker compose up --build
```

Frontend available at `http://localhost:3000`  
Backend API available at `http://localhost:8000`

### Add a movie (local)

```bash
curl -X POST http://localhost:8000/api/upload/ \
  -H "x-token: your_token_here" \
  -F "file=@/path/to/movie.mp4"
```

Place the corresponding poster as `/var/www/posters/MOVIENAME.png` (uppercase, no extension).

---

## CI/CD Pipeline

```
git push → GitHub Actions triggered
    │
    ├── Build backend Docker image
    ├── Build frontend Docker image  
    ├── Push both images to GHCR
    └── SSH into Azure VM
            └── Run deploy.sh
                    ├── docker compose pull
                    └── docker compose up -d
```

Secrets managed via GitHub Actions repository secrets (`SERVER_IP`, `SERVER_USER`, `SERVER_SSH_KEY`, `ADMIN_TOKEN`).

---

## Project Structure

```
time_pass/
├── .github/
│   └── workflows/
│       └── ci.yaml          # CI/CD pipeline
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── health.py    # Health check route
│   │   │   ├── movies.py    # Movie listing route
│   │   │   ├── upload.py    # Token-authenticated upload
│   │   │   └── info.py      # Project info route
│   │   ├── services/
│   │   │   └── movie_service.py  # Reads MP4s from disk
│   │   ├── core/
│   │   │   └── config.py    # Environment config
│   │   └── main.py          # FastAPI app + Prometheus setup
│   ├── dockerfile
│   └── requirement.txt
├── frontend/
│   ├── src/
│   │   └── App.js           # Main React app
│   ├── dockerfile           # Multi-stage: Node build → Nginx serve
│   └── package.json
└── docker-compose.yaml
```

---

## Legal Notice

This is a personal educational project demonstrating Full Stack and DevOps skills. Only a small number of sample videos are hosted strictly for demonstration purposes. This platform does not support or promote piracy or illegal content distribution. All rights belong to their respective owners.

---

## Author

**Divyajeetsinh Solanki** — B.Tech CSE (IoT), Manipal University Jaipur  
[github.com/devi-kisang](https://github.com/devi-kisang) · divyajeetsinhsolanki3112@gmail.com
