from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from ..models.company_model import Company
from ..schemas.company_schema import CompanyCreate

async def create_company(db: AsyncSession, company: CompanyCreate):
    new_company = Company(**company.model_dump())
    db.add(new_company)
    await db.commit()  
    await db.refresh(new_company)
    return new_company

async def get_companies(db: AsyncSession, page: int = 1, size: int = 10):
    offset = (page - 1) * size

    query = select(Company).limit(size).offset(offset)
    
    result = await db.execute(query)
    companies = result.scalars().all()
    
    if not companies:
        return {"companies": [], "page": page, "size": size, "total_companies": 0, "total_pages": 0}
    
    total_result = await db.execute(select(func.count(Company.id)))
    total_companies = total_result.scalar()

    total_pages = (total_companies + size - 1) // size  # Round up division

    return {
        "companies": companies,
        "page": page,
        "size": size,
        "total_companies": total_companies,
        "total_pages": total_pages,
    }


async def delete_company(db: AsyncSession, company_id: int):
    result = await db.execute(select(Company).filter(Company.id == company_id))
    company = result.scalars().first()
    if company:
        await db.delete(company)
        await db.commit()

