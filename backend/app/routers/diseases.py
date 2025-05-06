from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas
from ..database import SessionLocal
from ..models import ChronicDisease
from typing import List

router = APIRouter(prefix="/diseases", tags=["diseases"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.ChronicDiseaseOut])
def get_diseases(db: Session = Depends(get_db)):
    diseases = db.query(ChronicDisease).all()
    return diseases 