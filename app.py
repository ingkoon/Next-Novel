import asyncio
from datetime import datetime
import time

from PIL import Image
import io
from fastapi import FastAPI, UploadFile, File, Form, Response
from typing import List, Dict

from fastapi.responses import StreamingResponse

from gpt import run_openai_chatbot as chatbot
import caption
from diffusion import diffusion_ControlNet
from caption import inference_caption
import torch
import googletrans
import json
import time
import multiprocessing

translator = googletrans.Translator()
app = FastAPI()
pool = multiprocessing.Pool(processes=3)


def translate(before):
    start = time.time()
    question = before + "\n\nTranslate that only korean."
    after, history = chatbot(question, [])
    print(f'번역시간 : {time.time()-start}')
    return after

def replace_word(before):
    after = before.replace('a drawing of ', '').replace('an image of ', '').replace('a black and white drawing of ', '').replace(
        'an illustration of ', '').replace('photograph', '').replace('painting', '').replace('portrait', '').replace(
        'graphic', '').replace('snapshot', '').replace('sketch', '').replace('print', '').replace('photo', '').replace(
        'cartoon', '').replace('that is drawn in ink', '').replace('that is drawn', '').replace('in ink', '')
    return after


@app.post('/novel/start')
async def novel_start(images: List[UploadFile] = Form(...),
                       genre: str = Form(...)):
    image_bytes = []
    for image in images:
        image_bytes.append(await image.read())

    # caption_string[] : 이미지 6개 캡셔닝한 결과(영어)
    caption_string = []
    for i in image_bytes:
        caption_string.append(inference_caption(i))

    # en_string[] : caption_string[]에서 "그림" 단어 지우기
    en_string = []
    for str in caption_string:
        en_string.append(replace_word(str))
    print(en_string)

    # gpt에게 캡셔닝과 장르를 던져주고, 소설을 받음.
    # en_answer : 소설(영어)
    question = "Act as a StoryTeller. Write an endless novel story in the genre of {} in 5 sentences based on '{}','{}','{}','{}','{}','{}'.".format(
        genre, en_string[0], en_string[1], en_string[2], en_string[3], en_string[4], en_string[5])
    start = time.time()
    en_answer,new_history = chatbot(question,[])
    print(time.time()-start)

    # ko_string[] : 이미지 6개 캡셔닝한 결과(한글)
    translate_before = ""
    for i in range(len(en_string)):
        translate_before += en_string[i] + "\n"
    ko_string = [translate(translate_before).split("\n")[-i] for i in range(1, 7)][::-1]
    print(ko_string)

    # ko_answer : 소설(한글)
    ko_answer = translate(en_answer)

    return {"caption" : ko_string, "korean_answer" : ko_answer,"dialog_history" : new_history}


@app.post('/novel/question')
async def novel_question(dialog_history:str=Form(...)):
    dialog_history = json.loads(dialog_history)
    question = "Based on the story , give me 3 simple questions to proceed the next story. I wish the answers to those questions could be depicted in pictures."

    # en_answer : 질문들(영어)
    start = time.time()
    en_answer, new_history = chatbot(question, dialog_history)
    print(time.time()-start)

    # ko_answer : 질문들(한글)
    # query[] : 질문리스트(한글)
    ko_answer = translate(en_answer)
    query = ko_answer.split("\n")

    tmp = [query[-i].split(". ")[-1].split("?")[0]+"?" for i in range(1,4)][::-1]
    return {"query1" : tmp[0],"query2" : tmp[1],"query3" : tmp[2],"dialog_history" : new_history}


@app.post('/novel/sequence')
async def novel_sequence(image: UploadFile = Form(...),
                         previous_question:str=Form(...),
                         dialog_history:str=Form(...)):

    dialog_history = json.loads(dialog_history)

    # en_string : 이미지캡셔닝결과(영어)
    image_bytes = await image.read()
    en_string = replace_word(inference_caption(image_bytes))

    # ko_string : 이미지캡셔닝결과(한글)
    ko_string = translate(en_string)

    # en_previous_question : 질문(영어)
    # 한글로 받은 리퀘스트를 영어로 번역해서 gpt에게 쿼리로 던지기
    print(ko_string)
    en_previous_question = translator.translate(previous_question, dest="en").text

    question = "'{}' the answer to th question is '{}'. Act as a Storyteller.".format(en_previous_question,en_string)\
               +"Write a 5 sentences novel without an ending to the story."

    # en_answer : 소설(영어)
    start = time.time()
    en_answer,new_history = chatbot(question,dialog_history)
    print(time.time()-start)

    # ko_answer : 소설(한글)
    ko_answer = translate(en_answer)

    return {"caption" : ko_string, "korean_answer" : ko_answer,"dialog_history" : new_history}


@app.post('/novel/end')
async def novel_end(dialog_history:str=Form(...)):

    dialog_history = json.loads(dialog_history)

    # en_answer : 소설(영어)
    question = "Act as a storyteller. Based on the story, write the ending of the story in 5 sentences"
    start = time.time()
    en_answer, new_history = chatbot(question, dialog_history)
    print(time.time()-start)

    # ko_answer : 소설(한글)
    ko_answer = translate(en_answer)

    return {"korean_answer" : ko_answer}


@app.post('/novel/image')
async def image(image: UploadFile = Form(...)):
    image_bytes = await image.read()
    img = Image.open(io.BytesIO(image_bytes))
    img = img.resize((308,350))
    # 308 * 350 / diffusion
    # 608 * 380 / caption
    # en_string : 이미지캡셔닝(영어)
    # en_word : 이미지캡셔닝 단어(영어)
    en_string = replace_word(inference_caption(image_bytes))
    print(f"캡셔닝 문장 : {en_string}")
    # question = f'"{en_string}"\nInterpret this sentence and tell me in one word what object you drew'

    # start = time.time()
    # en_word, new_history = chatbot(question, [])
    # print(f"캡셔닝 단어 : {en_word}")
    # print(time.time() - start)

    # diffusion 이전 그림 파일 저장
    current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"diffusion/{current_time}.png"
    img.save(filename)

    start = time.time()
    res = diffusion_ControlNet.creat_image(filename, en_string)
    # res = img
    print(time.time()-start)

    # diffusion 이후 그림 파일 저장
    current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"diffusion/{current_time}.png"
    res.save(filename)

    # Read the saved image file
    with open(filename, "rb") as f:
        img_bytes = f.read()

    # Create a streaming response
    return StreamingResponse(
        io.BytesIO(img_bytes),
        media_type="image/png"
    )

@app.get('/cuda')
async def hello():
    return torch.cuda.is_available()

@app.get('/')
async def hello2():
    return "hello"
