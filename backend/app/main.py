from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.movies import router as movies_router

app = FastAPI(title="TIME-PASS API")

app.include_router(health_router, prefix="/api")
app.include_router(movies_router, prefix="/api")
