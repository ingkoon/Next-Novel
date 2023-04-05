import io

import open_clip
import torch
from PIL import Image

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model, _, transform = open_clip.create_model_and_transforms(
    "coca_ViT-L-14",
    pretrained="mscoco_finetuned_laion2B-s13B-b90k"
)
model.to(device)


def inference_caption(image_bytes, decoding_method="Beam search", rep_penalty=1.2, top_p=1, min_seq_len=1, seq_len=20):
    image = Image.open(io.BytesIO(image_bytes))
    im = transform(image).unsqueeze(0).to(device)
    generation_type = "beam_search" if decoding_method == "Beam search" else "top_p"
    with torch.no_grad(), torch.cuda.amp.autocast():
        generated = model.generate(
            im,
            generation_type=generation_type,
            top_p=float(top_p),
            min_seq_len=min_seq_len,
            seq_len=seq_len,
            repetition_penalty=float(rep_penalty)
        )
    return open_clip.decode(generated[0].detach()).split("<end_of_text>")[0].replace("<start_of_text>", "")
