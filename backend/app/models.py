from sqlalchemy import Column, Integer, String, Date, Float, ForeignKey, DateTime, Table, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String)
    gender = Column(String)
    birth_year = Column(Integer)
    height = Column(Float)
    weight = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    chronic_diseases = relationship('UserChronicDisease', back_populates='user')
    health_params = relationship('HealthParam', back_populates='user')
    lab_results = relationship('LabResult', back_populates='user')

class ChronicDisease(Base):
    __tablename__ = 'chronic_disease_list'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    users = relationship('UserChronicDisease', back_populates='disease')

class UserChronicDisease(Base):
    __tablename__ = 'user_chronic_disease'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    disease_id = Column(Integer, ForeignKey('chronic_disease_list.id'), primary_key=True)
    user = relationship('User', back_populates='chronic_diseases')
    disease = relationship('ChronicDisease', back_populates='users')

class HealthParam(Base):
    __tablename__ = 'health_params'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    date = Column(Date, default=datetime.utcnow)
    weight = Column(Float)
    height = Column(Float)
    blood_pressure = Column(String)
    pulse = Column(Integer)
    sleep_hours = Column(Float)
    mood = Column(Integer)
    energy = Column(Integer)
    notes = Column(Text)
    user = relationship('User', back_populates='health_params')

class LabResult(Base):
    __tablename__ = 'lab_results'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    date = Column(Date, default=datetime.utcnow)
    file_path = Column(String)
    parsed_data = Column(Text)  # JSON-строка
    type = Column(String)
    status = Column(String)
    user = relationship('User', back_populates='lab_results')

class LibraryItem(Base):
    __tablename__ = 'library_items'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    type = Column(String, nullable=False)  # книга, курс, приложение, протокол и т.д.
    icon = Column(String)  # эмодзи или иконка
    cover_url = Column(String)  # ссылка на обложку
    link = Column(String)  # ссылка на внешний ресурс
    tags = Column(Text)  # JSON-строка
    author = Column(String)
    rating = Column(Float) 