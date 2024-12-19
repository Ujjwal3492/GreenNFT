import  { useState } from "react";
import axios from "axios";

function ImageVerificationComponent() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image1 || !image2) {
      alert("Please upload both images.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);

    try {
      const response = await axios.post(
        "https://your-api-endpoint/verify-images", // Replace with your API URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error verifying images:", error);
      setResult({ error: "Verification failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Image Verification</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="image1">Upload Image 1:</label>
          <input
            id="image1"
            type="file"
            accept="image/*"
            onChange={handleImage1Change}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="image2">Upload Image 2:</label>
          <input
            id="image2"
            type="file"
            accept="image/*"
            onChange={handleImage2Change}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Submit"}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>Verification Result:</h4>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ImageVerificationComponent;
