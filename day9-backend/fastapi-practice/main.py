from fastapi import FastAPI
from routes import router

app = FastAPI(
    title="Collaboration Request Practice API",
    version="1.0.0",
    description="A minimal FastAPI sandbox inspired by CreatorBridge collaboration requests.",
)

app.include_router(router)
