from fastapi import APIRouter
from app.services.movie_service import get_movies

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/")
def list_movies():
    return {
        "status": "ok",
        "message": "Movie streaming coming soon",
        "movies": get_movies()
    }
