from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
from io import BytesIO
from transformers import CLIPProcessor, CLIPModel
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load pre-trained CLIP model and processor
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch16")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch16")

# Define waste categories
categories = ["plastic", "paper", "organic", "glass", "metal", "hazardous", "non-recyclable"]

# Initialize FastAPI
app = FastAPI()

# More permissive CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Be careful in production, use specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/classify/")
async def classify_waste(file: UploadFile = File(...)):
    try:
        # Log file details
        logger.info(f"Received file: {file.filename}, content type: {file.content_type}")

        # Read image file
        image_bytes = await file.read()
        
        # Validate file size and type (optional but recommended)
        if len(image_bytes) > 10 * 1024 * 1024:  # 10 MB limit
            raise HTTPException(status_code=400, detail="File too large")
        
        try:
            image = Image.open(BytesIO(image_bytes))
        except Exception as e:
            logger.error(f"Image processing error: {e}")
            raise HTTPException(status_code=400, detail="Invalid image file")

        # Preprocess the image
        inputs = processor(text=categories, images=image, return_tensors="pt", padding=True)

        # Perform classification
        with torch.no_grad():
            outputs = model(**inputs)
            logits_per_image = outputs.logits_per_image
            probs = logits_per_image.softmax(dim=1)

        # Get the highest probability category
        max_prob_index = torch.argmax(probs).item()
        label = categories[max_prob_index]
        confidence = probs[0, max_prob_index].item()

        logger.info(f"Classification result: {label}, Confidence: {confidence}")

        return {
            "waste_type": label, 
            "confidence": float(confidence)
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=str(e))