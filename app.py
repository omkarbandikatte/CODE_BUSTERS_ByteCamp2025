from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import torch
from PIL import Image
from io import BytesIO
from transformers import CLIPProcessor, CLIPModel
from fastapi.middleware.cors import CORSMiddleware

# Load pre-trained CLIP model and processor
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch16")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch16")

# Define waste categories
categories = ["plastic", "paper", "organic", "glass", "metal", "hazardous", "non-recyclable"]

# Initialize FastAPI
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Changed from 3004 to 3000
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


@app.get("/")
def home():
    return {"message": "Welcome to the Waste Classification API!"}

@app.post("/classify/")
async def classify_waste(file: UploadFile = File(...)):
    try:
        # Read image file
        image_bytes = await file.read()
        image = Image.open(BytesIO(image_bytes))

        # Preprocess the image
        inputs = processor(text=categories, images=image, return_tensors="pt", padding=True)

        # Perform classification
        with torch.no_grad():
            outputs = model(**inputs)
            logits_per_image = outputs.logits_per_image
            probs = logits_per_image.softmax(dim=1)

        # Get the highest probability category
        label = categories[torch.argmax(probs)]

        return JSONResponse(content={"waste_type": label, "confidence": probs.max().item()})
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Run the server
# Run uvicorn app:app --reload in terminal to start the API