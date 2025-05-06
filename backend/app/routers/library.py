from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import LibraryItem
from .. import schemas
from typing import List, Optional
import json

router = APIRouter(prefix="/library", tags=["library"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[schemas.LibraryItemOut])
def get_library(
    db: Session = Depends(get_db),
    type: Optional[str] = Query(None, description="Тип материала: книга, курс, приложение и т.д."),
    tag: Optional[str] = Query(None, description="Тег для фильтрации"),
    q: Optional[str] = Query(None, description="Поиск по названию/описанию")
):
    query = db.query(LibraryItem)
    if type:
        query = query.filter(LibraryItem.type == type)
    if tag:
        query = query.filter(LibraryItem.tags.like(f'%"{tag}"%'))  # ищем тег в JSON-строке
    if q:
        query = query.filter(
            (LibraryItem.title.ilike(f"%{q}%")) |
            (LibraryItem.description.ilike(f"%{q}%"))
        )
    items = query.all()
    result = []
    for item in items:
        tags = []
        if item.tags:
            try:
                tags = json.loads(item.tags)
            except Exception:
                tags = []
        result.append(schemas.LibraryItemOut(
            id=item.id,
            title=item.title,
            description=item.description,
            type=item.type,
            icon=item.icon,
            cover_url=item.cover_url,
            link=item.link,
            tags=tags,
            author=item.author,
            rating=item.rating
        ))
    return result 