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
# import diffusion.diffusion_ControlNet
# from diffusion.diffusion_ControlNet import creat_image
from caption import inference_caption
import torch
import googletrans
import json
import time
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

    en_string = []
    for i in image_bytes:
        en_string.append(inference_caption(i))
    question = "Act as a StoryTeller. Write an endless novel story in the genre of {} in 5 sentences based on {},{},{},{},{},{}.".format(genre,en_string[0],en_string[1],en_string[2],en_string[3],en_string[4],en_string[5])
    en_answer,new_history = chatbot(question,[])
    ko_answer = translator.translate(en_answer, dest="ko").text
    print(time.time()-start)

    return {"caption" : en_string, "korean_answer" : ko_answer,"dialog_history" : new_history}

@app.post('/novel/question')
async def novel_question(dialog_history:str=Form(...)):
    dialog_history = json.loads(dialog_history)
    question = "Based on the story , give me 3 simple questions to proceed the next story. I wish the answers to those questions could be depicted in pictures."
    en_answer, new_history = chatbot(question, dialog_history)
    ko_answer = translator.translate(en_answer, dest="ko").text
    query = ko_answer.split("\n")
    for i in range(3):
        if query[i][0].isdigit() and query[i][1:3] == '. ':
            query[i] = query[i][3:]

    return {"query1" : query[0],"query2" : query[1],"query3" : query[2],"dialog_history" : new_history}

@app.post('/novel/sequence')
async def novel_sequence(image: UploadFile = Form(...),
                         previous_question:str=Form(...),
                         dialog_history:str=Form(...)):

    start = time.time()
    dialog_history = json.loads(dialog_history)

    image_bytes = await image.read()
    en_string = inference_caption(image_bytes)
    question = "'{}' the answer to th question is '{}'. Act as a Storyteller.".format(previous_question,en_string)\
               +"Write a 5 sentences novel without an ending to the story."


    en_answer,new_history = chatbot(question,dialog_history)
    ko_answer = translator.translate(en_answer, dest="ko").text
    print(time.time()-start)

    return {"caption" : en_string, "korean_answer" : ko_answer,"dialog_history" : new_history}




@app.post('/novel/end')
async def novel_end(dialog_history:str=Form(...)):

    dialog_history = json.loads(dialog_history)

    question = "Act as a storyteller. Write the ending of the story in 5 sentences"
    en_answer, new_history = chatbot(question, dialog_history)
    ko_answer = translator.translate(en_answer, dest="ko").text

    return {"korean_answer" : ko_answer}

@app.post('/novel/image')
async def image(image: UploadFile = Form(...)):
    image_bytes = await image.read()
    img = Image.open(io.BytesIO(image_bytes))

    # Save the image to a file
    current_time = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"diffusion/{current_time}.png"
    img.save(filename)

    start = time.time()
    # res = creat_image(filename)
    res = img
    print(time.time()-start)

    # Save the image to a file
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
