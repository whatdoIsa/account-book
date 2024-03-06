from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from domain.AccData import accdata_router


app = FastAPI()

origins = [
    "http://localhost:3000",  "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(accdata_router.router)