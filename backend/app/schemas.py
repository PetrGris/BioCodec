from typing import List, Optional, Any
from pydantic import BaseModel, Field
from datetime import date

class UserBase(BaseModel):
    username: str
    name: Optional[str] = None
    gender: Optional[str] = None
    birth_year: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    chronic_diseases: Optional[List[int]] = []

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(UserBase):
    id: int
    class Config:
        from_attributes = True

class HealthParamBase(BaseModel):
    date: Optional[date] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    blood_pressure: Optional[str] = None
    pulse: Optional[int] = None
    sleep_hours: Optional[float] = None
    mood: Optional[int] = None
    energy: Optional[int] = None
    notes: Optional[str] = None

class HealthParamCreate(HealthParamBase):
    pass

class HealthParamOut(HealthParamBase):
    id: int
    class Config:
        from_attributes = True

class LabResultBase(BaseModel):
    date: Optional[date] = None
    type: Optional[str] = None
    status: Optional[str] = None

class LabResultCreate(LabResultBase):
    pass

class LabResultOut(LabResultBase):
    id: int
    file_path: Optional[str]
    parsed_data: Optional[Any]
    class Config:
        from_attributes = True

class ChronicDiseaseOut(BaseModel):
    id: int
    name: str
    class Config:
        from_attributes = True

class LibraryItemBase(BaseModel):
    title: str
    description: Optional[str] = None
    type: str  # книга, курс, приложение, протокол и т.д.
    icon: Optional[str] = None
    cover_url: Optional[str] = None
    link: Optional[str] = None
    tags: Optional[List[str]] = []
    author: Optional[str] = None
    rating: Optional[float] = None

class LibraryItemCreate(LibraryItemBase):
    pass

class LibraryItemOut(LibraryItemBase):
    id: int
    class Config:
        from_attributes = True 