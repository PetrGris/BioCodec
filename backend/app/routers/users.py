from fastapi import APIRouter, Depends, HTTPException
from .. import schemas

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate):
    # TODO: регистрация пользователя
    return schemas.UserOut(id=1, username=user.username)

@router.post("/login")
def login(user: schemas.UserLogin):
    # TODO: логин, возвращать токен
    return {"access_token": "fake-token", "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserOut)
def get_profile():
    # TODO: получить профиль текущего пользователя
    return schemas.UserOut(id=1, username="demo")

@router.put("/me", response_model=schemas.UserOut)
def update_profile(profile: schemas.UserBase):
    # TODO: обновить профиль
    return schemas.UserOut(id=1, username=profile.username) 