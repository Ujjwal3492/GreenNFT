from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import json
import re
import os

# Set up Tesseract executable path
pytesseract.pytesseract.tesseract_cmd = r"C:/Program Files/Tesseract-OCR/tesseract.exe"

app = Flask(__name__)

JSON_FILE_PATH = "geopoint.json"

def extract_text_from_image(image):
    """Extract text from an image using OCR."""
    try:
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        return f"Error extracting text: {e}"

def extract_data(input_string):
    """Extract address, latitude/longitude, and time/date from the extracted text."""
    try:
        lines = input_string.split('\n')
        address = lines[0].strip()
        lat_lon = lines[2].strip()
        time_date = lines[3].strip()

        # Extract latitude and longitude values
        lat_lon_match = re.match(r"Lat\s*([0-9.-]+)°\s*Long\s*([0-9.-]+)°", lat_lon)
        if lat_lon_match:
            latitude = float(lat_lon_match.group(1))
            longitude = float(lat_lon_match.group(2))
        else:
            raise ValueError("Latitude and longitude format is incorrect.")

        data = {
            "address": address,
            "location": {
                "latitude": latitude,
                "longitude": longitude
            },
            "timestamp": time_date
        }
        return data
    except Exception as e:
        return {"error": f"Error processing data: {e}"}

def validate_geo_location(before_data, after_data, lat_lon_limit=10):
    """Validate if the geo-location differences are within the acceptable limits."""
    try:
        before_lat = before_data["location"]["latitude"]
        before_lon = before_data["location"]["longitude"]
        after_lat = after_data["location"]["latitude"]
        after_lon = after_data["location"]["longitude"]

        lat_diff = abs(after_lat - before_lat)
        lon_diff = abs(after_lon - before_lon)

        if lat_diff <= lat_lon_limit and lon_diff <= lat_lon_limit:
            return {"status": "Valid", "message": "Coordinates match within acceptable limits."}
        else:
            return {"status": "Invalid", "message": "Coordinate differences exceed acceptable limits."}
    except KeyError as e:
        return {"error": f"Data format error: Missing key {e}"}

def is_geo_location_repeated(latitude, longitude, file_path=JSON_FILE_PATH):
    """Check if the latitude and longitude are already present in the JSON file."""
    if not os.path.exists(file_path):
        return False  # File doesn't exist, so data isn't repeated

    try:
        with open(file_path, 'r') as json_file:
            data = json.load(json_file)

        # Check if latitude and longitude are already in the JSON file
        for entry in data.get("locations", []):
            if entry["latitude"] == latitude and entry["longitude"] == longitude:
                return True

        return False
    except Exception as e:
        print(f"Error reading JSON file: {e}")
        return False

def save_geo_location(data, file_path=JSON_FILE_PATH):
    """Save new geo-location data to the JSON file."""
    try:
        if not os.path.exists(file_path):
            # Create the file with initial structure
            with open(file_path, 'w') as json_file:
                json.dump({"locations": []}, json_file)

        with open(file_path, 'r+') as json_file:
            existing_data = json.load(json_file)
            existing_data["locations"].append(data["location"])
            json_file.seek(0)
            json.dump(existing_data, json_file, indent=4)
    except Exception as e:
        print(f"Error saving data to JSON file: {e}")

@app.route('/process-images', methods=['POST'])
def process_images():
    """API endpoint to process two images and validate geo-location."""
    try:
        # Retrieve images from the request
        before_image = request.files.get('before_image')
        after_image = request.files.get('after_image')

        if not before_image or not after_image:
            return jsonify({"error": "Both 'before_image' and 'after_image' are required."}), 400

        # Extract text from images
        before_text = extract_text_from_image(Image.open(before_image))
        after_text = extract_text_from_image(Image.open(after_image))

        if not before_text or not after_text:
            return jsonify({"error": "Failed to extract text from one or both images."}), 500

        # Process the extracted text
        before_data = extract_data(before_text)
        after_data = extract_data(after_text)

        if "error" in before_data or "error" in after_data:
            return jsonify({"error": "Error processing extracted data.", "details": [before_data, after_data]}), 500

        # Check if geo-location is repeated
        is_repeated_before = is_geo_location_repeated(
            before_data["location"]["latitude"], before_data["location"]["longitude"]
        )
        is_repeated_after = is_geo_location_repeated(
            after_data["location"]["latitude"], after_data["location"]["longitude"]
        )

        if is_repeated_before or is_repeated_after:
            return jsonify({"status": "Repeated", "message": "One or both images have repeated geo-location data."})

        # Validate geo-location differences
        validation_result = validate_geo_location(before_data, after_data)

        if validation_result["status"] == "Valid":
            # Save valid geo-locations
            save_geo_location(before_data)
            save_geo_location(after_data)

        return jsonify({
            "before_data": before_data,
            "after_data": after_data,
            "validation_result": validation_result
        })

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
