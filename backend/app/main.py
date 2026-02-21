from fastapi import FastAPI
from app.api.health import router as health_router
from app.api.movies import router as movies_router

from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI(title="TIME-PASS API")

app.include_router(health_router, prefix="/api")
app.include_router(movies_router, prefix="/api")


# Enable metrics
Instrumentator().instrument(app).expose(app)