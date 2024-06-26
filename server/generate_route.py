from aggregate import generate
from aggregate import generate_simple
from fastapi import APIRouter
from fastapi import Request

router = APIRouter()


@router.post("/generate")
async def generate_lecture(request: Request):
    data = await request.json()
    topic = data.get("topic")
    lecture = await generate(topic)
    return lecture


@router.post("/generate-simple")
async def generate_simple_lecture(request: Request):
    print("Received request")
    data = await request.json()
    topic = data.get("topic")
    print("Received topic:", topic)
    lecture = await generate_simple(topic)
    return lecture
