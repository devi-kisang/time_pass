from fastapi import APIRouter

router = APIRouter(prefix="/info", tags=["info"])

@router.get("/")
def project_info():
    return {
        "project": "TimePass Streaming",
        "description": "Self-hosted video streaming platform built to demonstrate Full Stack and DevOps skills.",
        "status": "Under development",
        "msg":"This platform serves as a technical proof-of-concept designed to showcase advanced Backend Architecture and DevOps orchestration. To maintain strict adherence to digital privacy and licensing standards, the media library is intentionally curated. The focus here isn't on the volume of content, but on the seamless delivery, scalability, and infrastructure supporting it.",
        "contact": "divyajeetsinhsolanki3112@gmail.com"
    }