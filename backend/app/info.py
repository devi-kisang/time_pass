from fastapi import APIRouter

router = APIRouter(prefix="/info", tags=["info"])

@router.get("/")
def project_info():
    return {
        "project": "TimePass Streaming",
        "description": "Self-hosted video streaming platform built to demonstrate Full Stack and DevOps skills.",
        "status": "Under development",
        "author": "Divyajeetsinh Solanki",
        "contact": "divyajeetsinhsolanki3112@gmail.com"
    }