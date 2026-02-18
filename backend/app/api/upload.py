from fastapi import APIRouter, UploadFile, File
from fastapi import Header, HTTPException
import shutil
import os

ADMIN_TOKEN = "supersecret"

router = APIRouter(prefix="/upload", tags=["upload"])

VIDEO_DIR = "/var/www/videos"

@router.post("/")
def upload_movie(file: UploadFile = File(...), x_token: str = Header(...)):
    if x_token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Unauthorized")


@router.post("/")
def upload_movie(file: UploadFile = File(...)):
    if not file.filename.endswith(".mp4"):
        return {"error": "Only MP4 allowed"}

    file_path = os.path.join(VIDEO_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
