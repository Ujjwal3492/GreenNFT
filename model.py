from flask import Flask, request, jsonify
import numpy as np
from PIL import Image, ImageChops

app = Flask(__name__)

def preprocess_image(image):
    image = image.resize((224, 224))  # Resize images to the same dimensions
    return np.array(image)

def compare_images(image1, image2):
    """
    Compares two images and returns True if they are identical, False otherwise.
    """
    # Compute the absolute difference between the two images
    diff = ImageChops.difference(image1, image2)
    # If there is no difference, the bounding box will be None
    return diff.getbbox() is None

@app.route('/verify', methods=['POST'])
def verify_images():
    # Get the uploaded images
    before_image = request.files['before']
    after_image = request.files['after']

    # Open the images using PIL
    before_img = Image.open(before_image).convert("RGB")
    after_img = Image.open(after_image).convert("RGB")

    # Compare the two images
    are_images_same = compare_images(before_img, after_img)

    # Prepare the response
    response = {
        "are_images_same": are_images_same
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
