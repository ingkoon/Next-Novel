# %%
import requests
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine
import sqlalchemy as db
from datetime import datetime
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import numpy as np
from numpy import dot
from numpy.linalg import norm
from dotenv import load_dotenv

import os

load_dotenv()

DBNAME = os.environ.get('DBNAME')
USER_NAME = os.environ.get('USER_NAME') # USERNAME은 예약어
PASSWORD = os.environ.get('PASSWORD')
HOST = os.environ.get('HOST')
PORT = os.environ.get('PORT')

def conn():
    # print(
    #     DBNAME
    #     ,USER_NAME
    #     ,PASSWORD
    #     ,HOST
    #     ,PORT
    # )
    try:
        engine = create_engine(
            f'mysql+mysqldb://{USER_NAME}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}'
        )

        session = scoped_session(sessionmaker(autocommit=False,
                                                autoflush=False,
                                                bind=engine))
    except Exception:
        return {"msg" : Exception + "이유로 db 연결안됨"}
    
    return session

if __name__ == "__main__":
    print(conn())