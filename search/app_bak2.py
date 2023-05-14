from fastapi import FastAPI
import numpy as np
from numpy import dot
from numpy.linalg import norm
import pandas as pd
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from get_novel_data import get_novel_data

from db_conn import conn
from model import NovelContent

import urllib.request
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import requests
import re
from PIL import Image
from io import BytesIO
import nltk
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
from sklearn.metrics.pairwise import cosine_similarity
from nltk import sent_tokenize, word_tokenize
from konlpy.tag import Kkma
from tensorflow.keras.preprocessing.text import text_to_word_sequence

app = FastAPI()

corpus = []
corpus_set = set() # 재학습 판별용

kkm = Kkma()

# 불용어
def remove_stop_words(text):
    text = text.split()
    stops = []
    with open("stopwords.txt", encoding="utf-8") as f:
        stops.append(f.readlines())
    text = [w for w in text if not w in stops]
    text = " ".join(text)
    return text

def remove_html(text):
    html_pattern = re.compile('<.*?>')
    return html_pattern.sub(r'', text)

def learn():
    # db 연결
    session = conn()
    
    queryset = session.query(
        NovelContent.id,
        NovelContent.novel_id,
        NovelContent.content
    ).all()

    _df = pd.DataFrame(queryset)
    
    _df['cleaned'] = _df['content'].apply(remove_stop_words)
    _df['cleaned'] = _df.cleaned.apply(remove_html)

    _df['cleaned'].replace('', np.nan, inplace=True)
    _df = _df[_df['cleaned'].notna()]
    for words in _df['cleaned']:
        for a, b in kkm.pos(words):
            # 보통명사, 고유명사
            if b in ["NNG", "NNP"]:
                corpus.append(a)
                corpus_set.add(a)
    
    if not os.path.isfile("word2vec_model"):
        word2vec_model = Word2Vec(vector_size = 300, window=5, min_count = 2, workers = -1)
        word2vec_model.build_vocab(corpus)
    else:
        word2vec_model = Word2Vec.load("word2vec_model")
        word2vec_model.build_vocab(corpus, update=True)
    
    word2vec_model.train(corpus, total_examples = word2vec_model.corpus_count, epochs = 15)
    word2vec_model.save("word2vec_model")
    

###########
# 라우터

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/search")
def read_item(queries:list):
    is_learn = False
    for query in queries:
        if query not in corpus_set:
            is_learn = True
    
    if is_learn:
        learn()
    
    # content 속성이 null이면 공백으로 만들어주기
    if data['content'].isnull().sum() > 0:
        data['content'] = data['content'].fillna('')

    # content열만 따로 뽑아서 chatgpt의 내용 추가
    data_content = data['content']
    data_content.loc[len(data_content)] = querys

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

df = learn()