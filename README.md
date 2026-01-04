# DevOps CI/CD Pipeline Project

## Description
A FastAPI-based backend application with a complete CI pipeline using GitHub Actions and Docker.

## Features
- Automated CI pipeline on every push
- Dockerized application
- Production-like project structure

## Tech Stack
- Python (FastAPI)
- Docker
- GitHub Actions
- Linux

## How to Run
```bash
docker build -t devops-ci-cd .
docker run -p 8000:8000 devops-ci-cd
