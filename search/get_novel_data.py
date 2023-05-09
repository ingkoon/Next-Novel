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
from model import NovelContent

import os

DBNAME = os.environ.get('DBNAME')
USERNAME = os.environ.get('USERNAME')
PASSWORD = os.environ.get('PASSWORD')
HOST = os.environ.get('HOST')
PORT = os.environ.get('PORT')

def get_novel_data():
    try:
        engine = create_engine(
            f'mysql+mysqldb://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}'
        )

        session = scoped_session(sessionmaker(autocommit=False,
                                                autoflush=False,
                                                bind=engine))
    except Exception:
        return {"msg" : Exception + "이유로 db 연결안됨"}
        

    novel_content = session.query(NovelContent).all()

    queryset = session.query(
        NovelContent.id,
        NovelContent.novel_id,
        NovelContent.content
    ).all()

    return pd.DataFrame(queryset)

# chatgpt 데이터 넣기
# requests.get()
# # close the session
# session.close()
text_en = "In a vast ocean dotted with treacherous islands and hidden coves, a young boy with a straw hat named Luffy embarked on a grand adventure to become the greatest pirate king. With his loyal crew of friends, they sailed the seas in search of fabled treasures and the ultimate freedom. But their path was riddled with danger, as they encountered fierce marine forces determined to bring them to justice. Through battles and trials, Luffy's unwavering spirit and determination inspired not only his crew but also countless others to follow their dreams, setting the stage for an endless tale of pirates, camaraderie, and boundless exploration."
# text_ko = "꿈에 그린 무한한 모험의 이야기를 전할게요. 어디선가 파란 바다를 가로질러 곳곳에 숨겨진 보물을 찾으며, 갈망하는 소년인 루피는 고개에 쓴 모자를 쓰고 위대한 해적 왕이 되기 위한 대모험을 시작했습니다. 그의 믿음직한 친구들과 함께, 그는 마린 부대와 맞서 싸웠습니다. 하지만 그들의 길은 위험으로 가득한 여정이었으며, 그들은 전투와 시련을 겪으며 단결하여 함께 강해지는 법을 배웠습니다. 루피의 불굴의 정신과 결의는 그의 선원뿐만 아니라 수많은 이들에게 꿈을 향해 나아가는 용기를 주었습니다. 해적, 우정, 끝없는 탐험의 이야기가 펼쳐지는 무한한 이야기의 시작입니다."
text_ko = "첫페이지는 아닌데"

# tok_text_en = text_to_word_sequence(text_en)
# tok_text_ko = text_to_word_sequence(text_ko)

# mov = data.loc[0]["overview"]
# tok_mov = text_to_word_sequence(mov)

# %%
