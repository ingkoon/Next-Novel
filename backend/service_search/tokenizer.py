#%%

import nltk
import pandas as pd

# %%
import pandas as pd
import pandas_profiling
# data = pd.read_csv('spam.csv',encoding='latin1')
# data[:5]
# %%
from tensorflow.keras.preprocessing.text import text_to_word_sequence
# %%
# print('단어 토큰화1 :',text_to_word_sequence("Don't be fooled by the dark sounding name, Mr. Jone's Orphanage is as cheery as cheery goes for a pastry shop."))

# %%

print(text_to_word_sequence("test1 test2 don't test3"))

# %%
import numpy as np
from numpy import dot
from numpy.linalg import norm

def cos_sim(A, B):
  return dot(A, B)/(norm(A)*norm(B))

doc1 = np.array([0,1,1,1])
doc2 = np.array([1,0,1,1])
doc3 = np.array([2,0,2,2])

print('문서 1과 문서2의 유사도 :',cos_sim(doc1, doc2))
print('문서 1과 문서3의 유사도 :',cos_sim(doc1, doc3))
print('문서 2와 문서3의 유사도 :',cos_sim(doc2, doc3))
# %%
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

data = pd.read_csv('movies_metadata.csv', low_memory=False)
# %%

"""
novel_content table novel
input :
output :
"""


text_en = "In a vast ocean dotted with treacherous islands and hidden coves, a young boy with a straw hat named Luffy embarked on a grand adventure to become the greatest pirate king. With his loyal crew of friends, they sailed the seas in search of fabled treasures and the ultimate freedom. But their path was riddled with danger, as they encountered fierce marine forces determined to bring them to justice. Through battles and trials, Luffy's unwavering spirit and determination inspired not only his crew but also countless others to follow their dreams, setting the stage for an endless tale of pirates, camaraderie, and boundless exploration."
text_ko = "꿈에 그린 무한한 모험의 이야기를 전할게요. 어디선가 파란 바다를 가로질러 곳곳에 숨겨진 보물을 찾으며, 갈망하는 소년인 루피는 고개에 쓴 모자를 쓰고 위대한 해적 왕이 되기 위한 대모험을 시작했습니다. 그의 믿음직한 친구들과 함께, 그는 마린 부대와 맞서 싸웠습니다. 하지만 그들의 길은 위험으로 가득한 여정이었으며, 그들은 전투와 시련을 겪으며 단결하여 함께 강해지는 법을 배웠습니다. 루피의 불굴의 정신과 결의는 그의 선원뿐만 아니라 수많은 이들에게 꿈을 향해 나아가는 용기를 주었습니다. 해적, 우정, 끝없는 탐험의 이야기가 펼쳐지는 무한한 이야기의 시작입니다."

tok_text_en = text_to_word_sequence(text_en)
tok_text_ko = text_to_word_sequence(text_ko)

mov = data.loc[0]["overview"]
tok_mov = text_to_word_sequence(mov)
#%%
data['overview'].isnull().sum()
data['overview'] = data['overview'].fillna('')
#%%

# chatgpt 데이터 넣기
data_overview = data['overview']
data_overview.loc[len(data_overview)] = text_en

tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(data_overview)

# print('TF-IDF 행렬의 크기(shape) :',tfidf_matrix.shape)

#%%

cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
# print('코사인 유사도 연산 결과 :',cosine_sim.shape)

# 해당 영화와 모든 영화와의 유사도를 가져온다.
sim_scores = list(enumerate(cosine_sim[len(data_overview) - 1]))

# 유사도에 따라 영화들을 정렬한다.
sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

# 가장 유사한 10개의 영화를 받아온다.
sim_scores = sim_scores[1:11]

# 가장 유사한 10개의 영화의 인덱스를 얻는다.
movie_indices = [idx[0] for idx in sim_scores]

data['title'].iloc[movie_indices]
# %%
# dropna() 결측 행 제거, fillna() 값 채우기
cos_sim(tok_text_en, tok_mov)
# %%
data['title'].iloc[movie_indices]
# data['overview']

"""
22054                                  One Piece Film Z
22053                       One Piece Film Strong World
42023                              One Piece Film: GOLD
2253                                          King Kong
22629                                     Space Raiders
22230                           The Boy and the Pirates
22893                           Bionicle: Mask of Light
20612                                       Stolen Seas
12450    VeggieTales: The Pirates Who Don't Do Anything
105                              Muppet Treasure Island
"""
# %%
data['title'].iloc[movie_indices]