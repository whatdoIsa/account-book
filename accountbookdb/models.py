from sqlalchemy import Column, Integer, String, Date

from database import Base

class AccData(Base):
    __tablename__ = "accountbook"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=True)
    divi = Column(String, nullable=True)
    list = Column(String, nullable=True)
    pay = Column(Integer, nullable=True)
