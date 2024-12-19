import  { useState } from "react";
import Tesseract from "tesseract.js";
import Navbar from "./navbar/Navbar";

const TextExtractionComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setExtractedText(""); // Clear previous results
  };

  const handleExtractText = async () => {
    if (!selectedImage) {
      alert("Please upload an image first.");
      return;
    }

    setIsLoading(true);

    try {
      const imageFile = URL.createObjectURL(selectedImage);
      const result = await Tesseract.recognize(imageFile, "eng", {
        logger: (info) => console.log(info), // Logs progress
      });

      setExtractedText(result.data.text);
    } catch (error) {
      console.error("Error during text extraction:", error);
      setExtractedText("Failed to extract text. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Extract Text from Image</h2>
      <div style={{ marginBottom: "10px" }}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button onClick={handleExtractText} disabled={isLoading}>
        {isLoading ? "Extracting..." : "Extract Text"}
      </button>

      {selectedImage && (
        <div style={{ marginTop: "20px" }}>
          <h4>Selected Image:</h4>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}

      {extractedText && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
          <h4>Extracted Text:</h4>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default TextExtractionComponent;
