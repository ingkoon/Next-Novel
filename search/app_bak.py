from fastapi import FastAPI
import numpy as np
from numpy import dot
from numpy.linalg import norm
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from get_novel_data import get_novel_data
from db_conn import conn
from model import NovelContent

# 여기 검색할 내용 어떤걸로 할까요
def get_gpt_text():
    pass

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/search")
def read_item():
    # data 받아오기
    session = conn()
    
    queryset = session.query(
        NovelContent.id,
        NovelContent.novel_id,
        NovelContent.content
    ).all()

    data = pd.DataFrame(queryset)

    # content 속성이 null이면 공백으로 만들어주기
    if data['content'].isnull().sum() > 0:
        data['content'] = data['content'].fillna('')

    # content열만 따로 뽑아서 chatgpt의 내용 추가
    data_content = data['content']
    data_content.loc[len(data_content)] = get_gpt_text()

    # 단어 단위로 벡터라이징
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(data_content)

    # 모든 행렬의 코사인유사도
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
    
    # 코사인 유사도 점수로 랭크
    sim_scores = list(enumerate(cosine_sim[len(data_content) - 1]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 가장 유사한 10개의 텍스트를 받아온다.
    sim_scores = sim_scores[1:11]

    # 가장 유사한 10개의 텍스트의 인덱스를 얻는다.
    df = pd.DataFrame(sim_scores)
    df.columns = ["id", "scores"]
    df["content"] = data['content']

    return df.to_json()
