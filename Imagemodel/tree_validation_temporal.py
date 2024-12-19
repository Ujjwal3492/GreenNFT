import tensorflow as tf
import numpy as np
import cv2
import matplotlib.pyplot as plt

def preprocess_image(image_path, target_size):
    """Preprocess the input image for DeepLabV3 model."""
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image_resized = cv2.resize(image, target_size)
    input_data = np.expand_dims(image_resized, axis=0).astype(np.float32)
    return image, input_data

def compute_difference(before_image, after_image):
    """Compute the absolute difference between two images."""
    
    # Ensure both images have the same size
    if before_image.shape != after_image.shape:
        after_image = cv2.resize(after_image, (before_image.shape[1], before_image.shape[0]))
        print("Resized after_image to match before_image dimensions")

    # Convert both images to grayscale
    before_gray = cv2.cvtColor(before_image, cv2.COLOR_BGR2GRAY)
    after_gray = cv2.cvtColor(after_image, cv2.COLOR_BGR2GRAY)
    
    # Compute the absolute difference
    difference = cv2.absdiff(before_gray, after_gray)
    
    # Threshold the difference to get binary output (you can adjust the threshold value as needed)
    _, thresholded_diff = cv2.threshold(difference, 50, 255, cv2.THRESH_BINARY)
    
    return thresholded_diff

def detect_tree_change(thresholded_diff):
    """Detect if tree has been planted based on the difference."""
    # Find contours in the thresholded difference image
    contours, _ = cv2.findContours(thresholded_diff, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # If there are contours, it means a change has occurred (i.e., tree planting)
    if contours:
        return "Tree plantation validation succeeded"
    else:
        return "Tree plantation validation failed"

# Main Execution
before_image_path = "images/before.jpg"
after_image_path = "images/after.jpg"
target_size = (513, 513)  # Size for input images to the model

# Load and preprocess images
before_image, before_input_data = preprocess_image(before_image_path, target_size)
after_image, after_input_data = preprocess_image(after_image_path, target_size)

# Compute difference between before and after images
thresholded_diff = compute_difference(before_image, after_image)

# Detect tree plantation based on the computed difference
validation_result = detect_tree_change(thresholded_diff)

# Output the result
print(validation_result)
