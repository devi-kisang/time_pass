from fastapi import APIRouter
from app.services.movie_service import get_movies

router = APIRouter(prefix="/movies", tags=["movies"])

@router.get("/")
def list_movies():
    movies = get_movies()

    # add streaming URL for frontend
    for movie in movies:
        movie["stream_url"] = f"/videos/{movie['filename']}"

    return movies
