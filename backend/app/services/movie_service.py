import os

VIDEO_DIR = "/var/www/videos"

def get_movies():
    movies = []

    if not os.path.exists(VIDEO_DIR):
        return []

    for filename in os.listdir(VIDEO_DIR):
        if filename.endswith(".mp4"):
            movie_id = filename.replace(".mp4", "")
            movies.append({
                "id": movie_id,
                "title": movie_id.replace("_", " ").title(),
                "filename": filename
            })

    return movies
