#%%
import urllib.request
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import requests
import re
from PIL import Image
from io import BytesIO
from nltk.tokenize import RegexpTokenizer
import nltk
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
from sklearn.metrics.pairwise import cosine_similarity
from nltk import sent_tokenize, word_tokenize
from konlpy.tag import Kkma
from tensorflow.keras.preprocessing.text import text_to_word_sequence
# urllib.request.urlretrieve("https://raw.githubusercontent.com/ukairia777/tensorflow-nlp-tutorial/main/09.%20Word%20Embedding/dataset/data.csv", filename="data.csv")
df = pd.read_excel("test_Newsdata-100.xlsx")

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

df['cleaned'] = df['content'].apply(remove_stop_words)
df['cleaned'] = df.cleaned.apply(remove_html)

df['cleaned'].replace('', np.nan, inplace=True)
df = df[df['cleaned'].notna()]

kkm = Kkma()

corpus = []
corpus_set = set() # 재학습 판별용
for words in df['cleaned'][:5]:
    for a, b in kkm.pos(words):
        # 보통명사, 고유명사
        if b in ["NNG", "NNP"]:
            corpus.append(a)
            corpus_set.add(a)

word2vec_model = Word2Vec(vector_size = 300, window=5, min_count = 2, workers = -1)
word2vec_model.build_vocab(corpus)
word2vec_model.wv.vectors_lockf = np.ones(len(word2vec_model.wv), dtype=np.float32)
word2vec_model.wv.intersect_word2vec_format('GoogleNews-vectors-negative300.bin.gz', lockf=1.0, binary=True)
word2vec_model.train(corpus, total_examples = word2vec_model.corpus_count, epochs = 15)
word2vec_model.save("word2vec_model")

def get_document_vectors(document_list):
    document_embedding_list = []

    # 각 문서에 대해서
    for line in document_list:
        doc2vec = None
        count = 0
        for word in line.split():
            if word in word2vec_model.wv:
                count += 1
                
                # 해당 문서에 있는 모든 단어들의 벡터값을 더한다.
                if doc2vec is None:
                    doc2vec = word2vec_model.wv[word]
                else:
                    doc2vec = doc2vec + word2vec_model.wv[word]
                    
        if doc2vec is not None:
            # 단어 벡터를 모두 더한 벡터의 값을 문서 길이로 나눠준다.
            doc2vec = doc2vec / count
            document_embedding_list.append(doc2vec)

    # 각 문서에 대한 문서 벡터 리스트를 리턴
    return document_embedding_list

document_embedding_list = get_document_vectors(df['cleaned'])
print('문서 벡터의 수 :',len(document_embedding_list))

cosine_similarities = cosine_similarity(document_embedding_list, document_embedding_list)
print('코사인 유사도 매트릭스의 크기 :',cosine_similarities.shape)

# %%
def recommendations(title):
    books = df[['title', 'content']]

    # # 책의 제목을 입력하면 해당 제목의 인덱스를 리턴받아 idx에 저장.
    indices = pd.Series(df.index, index = df['title']).drop_duplicates()    
    idx = indices[title][:-60]
    
    # # 입력된 책과 줄거리(document embedding)가 유사한 책 5개 선정.
    sim_scores = list(enumerate(cosine_similarities[idx]))
    
    sim_scores = sorted(sim_scores, key = lambda x: x[1], reverse = True)
    sim_scores = sim_scores[1:6]

    # # 가장 유사한 책 5권의 인덱스
    # book_indices = [i[0] for i in sim_scores]

    # print(book_indices)
    return

    # 전체 데이터프레임에서 해당 인덱스의 행만 추출. 5개의 행을 가진다.
    recommend = books.iloc[book_indices].reset_index(drop=True)

    fig = plt.figure(figsize=(20, 30))

    # 데이터프레임으로부터 순차적으로 이미지를 출력
    for index, row in recommend.iterrows():
        response = requests.get(row['image_link'])
        img = Image.open(BytesIO(response.content))
        fig.add_subplot(1, 5, index + 1)
        plt.imshow(img)
        plt.title(row['title'])

recommendations("남한 기대 수명 83세 세계 9위, 북한은 얼마일까")
# %%
recommendations("The Murder of Roger Ackroyd")
# %%
