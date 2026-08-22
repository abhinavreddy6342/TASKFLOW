from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.config import FRONTEND_URL
from app.routes.auth import router as auth_router
from app.routes.tasks import router as tasks_router

# Import models so SQLAlchemy knows about them
from app.models import User, Task


# =========================================================
# DATABASE TABLES
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="TASKFLOW API",
    description="Task management backend for TASKFLOW",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

allowed_origins = [
    FRONTEND_URL,
]

# Keep local development available
if FRONTEND_URL != "http://localhost:5173":
    allowed_origins.extend(
        [
            "http://localhost:5173",
            "http://127.0.0.1:5173",
        ]
    )


app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=[
        "Authorization",
        "Content-Type",
    ],
)


# =========================================================
# ROUTES
# =========================================================

app.include_router(auth_router)
app.include_router(tasks_router)


# =========================================================
# ROOT ENDPOINT
# =========================================================

@app.get("/")
def root():
    return {
        "message": "TASKFLOW API is running",
        "status": "success",
    }