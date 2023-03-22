import asyncio
import time

from PIL import Image
import io
from fastapi import FastAPI, UploadFile, File, Form
from typing import List, Dict
from gpt import run_openai_chatbot as chatbot
from diffusion import creat_image
from caption import inference_caption
import googletrans
import json
import multiprocessing

translator = googletrans.Translator()
app = FastAPI()
pool = multiprocessing.Pool(processes=3)



@app.post('/novel/start')
async def novel_start(images: List[UploadFile] = Form(...),
                       genre: str = Form(...)):

    start = time.time()
    image_bytes = []
    for image in images:
        image_bytes.append(await image.read())

    # print(time.time()-start)

    en_string = pool.map(inference_caption, image_bytes)
    print(en_string)
    question = "Act as a StoryTeller. Write an endless novel story in the genre of {} in 5 sentences based on {},{},{},{},{},{}.And write a sentence that summarizes this story in 3 sentences".format(genre,en_string[0],en_string[1],en_string[2],en_string[3],en_string[4],en_string[5])
    en_answer,new_history = chatbot(question,[])
    ko_answer = translator.translate(en_answer, dest="ko").text
    print(time.time()-start)
    return {"korean_answer" : ko_answer,"dialog_history" : new_history}
    # return "hello"
@app.post('/novel/question')
async def novel_question(dialog_history:str=Form(...)):
    dialog_history = json.loads(dialog_history)
    question =  "Ask me 3 questions. i wish the answers to those questions could be depicted in pictures"
    en_answer, new_history = chatbot(question, dialog_history)
    ko_answer = translator.translate(en_answer, dest="ko").text

    return {"english_answer" : ko_answer,"dialog_history" : new_history}

@app.post('/novel/sequence')
async def novel_sequence(image: UploadFile = Form(...),
                         previous_question:str=Form(...),
                         dialog_history:str=Form(...)):

    dialog_history = json.loads(dialog_history)

    image_bytes = await image.read()
    img = Image.open(io.BytesIO(image_bytes))
    en_string = inference_caption(img)

    question = "{}. the answer to th question is {}. Act as a Storyteller".format(previous_question,en_string)\
               +"Write a 5 sentences novel without an ending to the story. and write a sentence that summarizes this story in 3 sentences"


    en_answer,new_history = chatbot(question,dialog_history)
    ko_answer = translator.translate(en_answer, dest="ko").text

    return {"korean_answer" : ko_answer,"dialog_history" : new_history}




@app.post('/novel/end')
async def novel_end(dialog_history:str=Form(...)):

    dialog_history = json.loads(dialog_history)

    question = "act as a storyteller. write the ending of the story in 5 sentences"
    en_answer, new_history = chatbot(question, dialog_history)
    ko_answer = translator.translate(en_answer, dest="ko").text

    return {"korean_answer" : ko_answer}

@app.post('/image')
async def image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes))
    image.save(file.filename)
    return creat_image(open(file.filename,"rb"))[1]

@app.get('/')
def hello():
    return "hello"
