from fastapi import APIRouter, HTTPException
from database import SessionLocal
from models import AccData
import json
from pydantic import BaseModel
from datetime import date

router = APIRouter(
    prefix="/api/accdata",
)

class AccCreate(BaseModel):
    date : date
    divi : str
    list : str
    pay : int

    class Config:
        orm_mode = True

@router.get("/max_id")
async def get_max_id():
    db = SessionLocal()
    result = db.query(AccData.id).order_by(AccData.id.desc()).first()
    if result:
        max_id = result[0]
        db.close()
        return {"max_id": max_id}
    else:
        db.close()
        return {"max_id": None}

@router.get("/list")
def accdata_list(s_id : int = None):
    db = SessionLocal()
    if s_id :
        _accdata_list = db.query(AccData).filter(AccData.id==s_id).order_by(AccData.date.desc()).all()
    else :
        _accdata_list = db.query(AccData).order_by(AccData.date.asc()).all()
    db.close()
    
    return _accdata_list

@router.post("/insert/", response_model=AccCreate)
async def create_acc(acc: AccCreate):
    db = SessionLocal()
    db_acc = AccData(**acc.dict())
    db.add(db_acc)
    db.commit()
    db.refresh(db_acc)
    db.close()

    return db_acc

@router.delete("/delete/{acc_id}/")
async def delete_acc(acc_id: int):
    db = SessionLocal()
    acc = db.query(AccData).filter(AccData.id == acc_id).first()
    if acc is None:
        db.close()
        raise HTTPException(status_code=404, detail="acc not found")
    db.delete(acc)
    db.commit()
    db.close()
    return {"message": "acc deleted successfully"}

@router.put("/update/{acc_id}")
async def update_acc(acc_id: int, acc: AccCreate):
    db = SessionLocal()
    db_acc = db.query(AccData).filter(AccData.id == acc_id).first()

    if db_acc is None:
        raise HTTPException(status_code=404, detail="acc not found")
    
    db_acc.date = acc.date
    db_acc.divi = acc.divi
    db_acc.list = acc.list
    db_acc.pay = acc.pay

    db.commit()
    db.refresh(db_acc)
    db.close()
    return {"message": "AccData updated successfully"}
