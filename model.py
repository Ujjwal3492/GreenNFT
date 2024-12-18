from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image

app = Flask(__name__)

# Load pre-trained tree detection model
# Replace 'tree_detection_model.h5' with the path to your trained model
model = load_model("tree_detection_model.h5")

def preprocess_image(image):
    """
    Preprocess the image for the AI model:
    - Resize to (224, 224)
    - Normalize pixel values
    - Add batch dimension
    """
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/verify', methods=['POST'])
def verify_tree():
    """
    Compare the 'before' and 'after' images to verify if a tree was planted.
    """
    before_image = request.files['before']
    after_image = request.files['after']

    # Preprocess the images
    before_img = preprocess_image(Image.open(before_image))
    after_img = preprocess_image(Image.open(after_image))

    # Predict tree presence in both images
    before_score = model.predict(before_img)[0][0]  # Tree presence score for 'before'
    after_score = model.predict(after_img)[0][0]   # Tree presence score for 'after'

    # Determine if a tree was planted
    improvement = after_score - before_score
    threshold = 0.5  # Define the minimum required improvement for verification

    response = {
        "before_score": before_score,
        "after_score": after_score,
        "improvement": improvement,
        "tree_planted": improvement > threshold  # True if improvement is above the threshold
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
