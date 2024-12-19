from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
import numpy as np
import cv2
from io import BytesIO
from PIL import Image

app = FastAPI()

def preprocess_image(file, target_size):
    """Preprocess the input image for DeepLabV3 model."""
    image = np.array(Image.open(file))
    image_resized = cv2.resize(image, target_size)
    input_data = np.expand_dims(image_resized, axis=0).astype(np.float32)
    return image, input_data

def compute_difference(before_image, after_image):
    """Compute the absolute difference between two images."""
    if before_image.shape != after_image.shape:
        after_image = cv2.resize(after_image, (before_image.shape[1], before_image.shape[0]))

    before_gray = cv2.cvtColor(before_image, cv2.COLOR_RGB2GRAY)
    after_gray = cv2.cvtColor(after_image, cv2.COLOR_RGB2GRAY)
    difference = cv2.absdiff(before_gray, after_gray)
    _, thresholded_diff = cv2.threshold(difference, 50, 255, cv2.THRESH_BINARY)
    return thresholded_diff

def detect_tree_change(thresholded_diff):
    """Detect if tree has been planted based on the difference."""
    contours, _ = cv2.findContours(thresholded_diff, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        return "Tree plantation validation succeeded"
    else:
        return "Tree plantation validation failed"

@app.post("/validate-tree-plantation/")
async def validate_tree_plantation(before_file: UploadFile = File(...), after_file: UploadFile = File(...)):
    target_size = (513, 513)
    
    before_image, _ = preprocess_image(BytesIO(await before_file.read()), target_size)
    after_image, _ = preprocess_image(BytesIO(await after_file.read()), target_size)
    
    thresholded_diff = compute_difference(before_image, after_image)
    result = detect_tree_change(thresholded_diff)
    
    return {"result": result}

# Run the server using `uvicorn app:app --reload`
