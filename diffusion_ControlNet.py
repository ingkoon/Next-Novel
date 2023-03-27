# import os
# os.system("pip install -qq opencv-contrib-python diffusers transformers git+https://github.com/huggingface/accelerate.git")

from diffusers.utils import load_image

import cv2
from PIL import Image
import numpy as np

from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
from diffusers import UniPCMultistepScheduler
import torch


controlnet_model = "lllyasviel/sd-controlnet-canny"
sd_model = "runwayml/stable-diffusion-v1-5"

controlnet = ControlNetModel.from_pretrained(
    controlnet_model,
    torch_dtype=torch.float16
)
pipe = StableDiffusionControlNetPipeline.from_pretrained(
    sd_model, controlnet=controlnet, torch_dtype=torch.float16
)

pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
pipe.enable_model_cpu_offload()


def creat_image(input_image):
    # 1. 이미지 로드
    # image = load_image("https://hf.co/datasets/huggingface/documentation-images/resolve/main/diffusers/input_image_vermeer.png")
    print(input_image)

    image = load_image(input_image)
    print(image)

    # image

    # 2. 원본 이미지를 Canny Edge로 전환
    low_threshold = 100
    high_threshold = 200

    np_image = np.array(image)

    canny_image = cv2.Canny(np_image, low_threshold, high_threshold)

    canny_image = canny_image[:, :, None]
    canny_image = np.concatenate([canny_image, canny_image, canny_image], axis=2)
    canny_image = Image.fromarray(canny_image)

    # canny_image

    # 3. Canny Edge 조건으로 새로운 이미지 생성
    prompt = "cartoon"
    num_steps = 20
    seed = 0

    print("prev image")
    out_image = pipe(
        prompt,
        num_inference_steps=num_steps,
        generator=torch.manual_seed(seed),
        image=canny_image
    ).images[0]

    print("after image")
    return out_image