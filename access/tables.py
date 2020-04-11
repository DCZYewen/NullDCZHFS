from sqlalchemy import Column, String, Integer, Boolean
from core.db import Base


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, index=True, primary_key=True)
    name = Column(String(20), unique=True, nullable=False)
    password = Column(String(128), nullable=False)
    is_super = Column(Boolean, default=False)


class Session(Base):
    __tablename__ = "session"
    id = Column(Integer, primary_key=True)
    sessionid = Column(String(50), index=True, nullable=False)
    name = Column(String(20))
    expire = Column(Integer)