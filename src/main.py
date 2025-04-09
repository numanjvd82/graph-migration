from fastapi import FastAPI
from .database import Base, engine
from contextlib import asynccontextmanager
from .routes.company_router import router as company_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    yield  

    # Cleanup
    await engine.dispose()


app = FastAPI(lifespan=lifespan)

@app.get("/")
async def main():
    return {"message": "Welcome to the PingCRM API!"}

app.include_router(company_router)

