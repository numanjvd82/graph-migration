from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..schemas.company_schema import CompanyCreate, CompanyResponse, PaginatedCompanyResponse
from ..controllers.company_controller import create_company, get_companies, delete_company

router = APIRouter(prefix="/companies", tags=["Companies"])

@router.post("/", response_model=CompanyResponse)
async def add_company(company: CompanyCreate, db: Session = Depends(get_db)):
    return await create_company(db, company)

@router.get("/", response_model=PaginatedCompanyResponse)
async def list_companies(db: Session = Depends(get_db), page: int = 1, size: int = 10):
    return await get_companies(db, page, size)

@router.delete("/{company_id}")
async def remove_company(company_id: int, db: Session = Depends(get_db)):
    await delete_company(db, company_id)
    return {"message": "Company deleted"}
