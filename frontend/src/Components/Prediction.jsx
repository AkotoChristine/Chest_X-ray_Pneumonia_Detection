import { useState } from "react";

export default function Prediction() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrediction(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please upload an X-ray image.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("🔍 API Response:", result);

      if (response.ok && result.result) {
        setPrediction(result.result);
; // Adjust based on actual key in response
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error(" Prediction failed:", err);
      setError("Prediction failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Chest X-ray Pneumonia Prediction</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-3 rounded mb-4"
        />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Submit X-ray"}
        </button>
      </form>

      {prediction && (
        <div className="mt-8 text-center bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Prediction Result:</h3>
          <p
            className={`text-2xl font-bold mt-2 ${
              prediction.toLowerCase().includes("pneumonia") ? "text-red-600" : "text-green-600"
            }`}
          >
            {prediction}
          </p>
        </div>
      )}
    </section>
  );
}
