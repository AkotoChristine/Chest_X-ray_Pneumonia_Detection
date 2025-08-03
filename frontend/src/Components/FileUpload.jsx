import { useState, useRef } from "react";
import ModelRetrain from "./ModelRetrain";
import histplot from "../assets/histplot.png";
import correlation from "../assets/correlation.png";

export default function FileUpload({ onFileUpload }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ New success message state
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const isImage = (fileName) => /\.(jpe?g|png)$/i.test(fileName);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const invalidFiles = selectedFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      setError("Only JPG, JPEG, and PNG files are allowed.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError("Please select at least one image file first.");
      setSuccess("");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-data", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Upload failed.");
      }

      // ✅ Display success message instead of alert
      setSuccess(
        `Uploaded ${files.length} file${files.length > 1 ? "s" : ""} successfully.`
      );
      setFiles([]);

      if (onFileUpload) {
        onFileUpload(files);
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setError("Upload failed. Please try again.");
      setSuccess("");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) => isImage(file.name));

    if (!validFiles.length) {
      setError("Only image files (JPG, JPEG, PNG) are allowed");
      setSuccess("");
      return;
    }

    setFiles(validFiles);
    setError("");
    setSuccess("");
  };

  return (
    <section className="mb-4 mx-auto px-8">
      <h2 className="my-8 text-center font-bold text-3xl">
        Upload X-ray Images for Pneumonia Prediction
      </h2>
      <div className="flex gap-3">
        <img src={correlation} className="object-contain w-1/4" alt="correlation" />
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
              multiple
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-600">
                {files.length
                  ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
                  : "Drag & drop your X-ray images here, or click to browse"}
              </p>
              <p className="text-sm text-gray-500">
                Only JPG, JPEG, and PNG files are accepted
              </p>
            </div>
          </div>

          {/* Display error or success messages */}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}

          {files.length > 0 && (
            <div className="mt-4 space-y-1 max-h-24 overflow-y-auto">
              {files.map((file, idx) => (
                <div key={idx} className="text-sm text-gray-600 truncate">
                  {file.name}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFiles([])}
                className="text-sm text-red-600 hover:text-red-800 mt-1"
              >
                Remove All
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleUpload}
            disabled={!files.length || uploading}
            className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
              files.length && !uploading
                ? "bg-[#00abf0] hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
        <img src={histplot} className="object-contain w-1/4" alt="histogram" />
      </div>

      <ModelRetrain />
    </section>
  );
}
