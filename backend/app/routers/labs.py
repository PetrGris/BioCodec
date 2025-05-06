from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas
from ..database import SessionLocal
from ..models import LabResult
from typing import List
import os
import shutil

router = APIRouter(prefix="/labs", tags=["labs"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload", response_model=schemas.LabResultOut)
def upload_lab(file: UploadFile = File(...), db: Session = Depends(get_db)):
    # Сохраняем файл на диск
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    # Создаём запись в БД
    lab = LabResult(
        user_id=1,  # пока захардкожено
        file_path=file_path,
        parsed_data={},
        type="неизвестно",
        status="uploaded"
    )
    db.add(lab)
    db.commit()
    db.refresh(lab)
    return lab

@router.get("/", response_model=List[schemas.LabResultOut])
def get_labs(db: Session = Depends(get_db)):
    labs = db.query(LabResult).filter(LabResult.user_id == 1).all()  # пока только user_id=1
    return labs 