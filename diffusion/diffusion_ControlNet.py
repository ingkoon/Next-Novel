from diffusers.utils import load_image

import cv2
from PIL import Image
import numpy as np

from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
from diffusers import UniPCMultistepScheduler
import torch
from random import randint


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

def creat_image(input_image, caption):
    # 1. 이미지 로드
    image = load_image(input_image)
    # image.show()

    # 2. 원본 이미지를 Canny Edge로 전환
    low_threshold = 100
    high_threshold = 200

    np_image = np.array(image)

    canny_image = cv2.Canny(np_image, low_threshold, high_threshold)

    canny_image = canny_image[:, :, None]
    canny_image = np.concatenate([canny_image, canny_image, canny_image], axis=2)
    canny_image = Image.fromarray(canny_image)

    # 3. Canny Edge 조건으로 새로운 이미지 생성
    prompt = f"{caption}, high quality, photorealistic, sharp focus, depth of field"
    num_steps = 20
    seed = randint(0, 10000)

    out_image = pipe(
        prompt,
        num_inference_steps=num_steps,
        generator=torch.manual_seed(seed),
        image=canny_image
    ).images[0]

    return out_image