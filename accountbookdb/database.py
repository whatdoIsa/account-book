from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# DB ID/PW는 보안에 유의하여 관리 해주시기 바랍니다.
db_id = 'dbuser'
db_pw = 'db12'
db_ip = 'localhost'
db_port = '3306'
db_database = 'sqldb'

database_uri = f'mysql+pymysql://{db_id}:{db_pw}@{db_ip}:{db_port}/{db_database}'

# SQLAlchemy 엔진 및 세션 생성
engine = create_engine(
    database_uri,
    pool_size=10,  # 최대 연결 수
    max_overflow=20,  # 추가 연결 수 (pool_size를 초과하는 경우)
    pool_timeout=30,  # 연결 대기 시간 (초)
    pool_recycle=1800,  # 연결 재사용 주기 (초)
    echo=True  # SQL 문과 파라미터를 로그로 출력                   
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()