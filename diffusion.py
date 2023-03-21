import replicate
import os

os.environ["REPLICATE_API_TOKEN"] = "91ae93475e93055555539c239a2e962ae3e58797"
model = replicate.models.get("jagilley/controlnet-scribble")
version = model.versions.get("435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117")
def creat_image(image):

    # https://replicate.com/jagilley/controlnet-scribble/versions/435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117#input
    inputs = {
        # Input image
        'image': image,

        # Prompt for the model
        # 'prompt': "cartoon, softly, disney, fairy tale, classic, ordinary",
        'prompt' : " <<fairy-tale-painting-style>>",

        # Number of samples (higher values may OOM)
        'num_samples': "1",

        # Image resolution to be generated
        'image_resolution': "512",

        # Steps
        'ddim_steps': 20,

        # Guidance Scale
        # Range: 0.1 to 30
        'scale': 9,

        # Seed
        'seed': 0,

        # eta (DDIM)
        'eta': 0,

        # Added Prompt
        'a_prompt': "",

        # Negative Prompt
        # 'n_prompt': "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        'n_prompt': "",

    }

    # https://replicate.com/jagilley/controlnet-scribble/versions/435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117#output-schema
    output = version.predict(**inputs)
    return output
