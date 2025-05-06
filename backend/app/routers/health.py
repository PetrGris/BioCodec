from fastapi import APIRouter, Depends
from .. import schemas
from typing import List

router = APIRouter(prefix="/health", tags=["health"])

@router.post("/", response_model=schemas.HealthParamOut)
def add_param(param: schemas.HealthParamCreate):
    # TODO: добавить параметр
    return schemas.HealthParamOut(id=1)

@router.get("/", response_model=List[schemas.HealthParamOut])
def get_params():
    # TODO: получить список параметров
    return [] 