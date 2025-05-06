from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import users, health, labs, diseases
from .routers import library

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping():
    return {"status": "ok"}

app.include_router(users.router)
app.include_router(health.router)
app.include_router(labs.router)
app.include_router(diseases.router)
app.include_router(library.router) 