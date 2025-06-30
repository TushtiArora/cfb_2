import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const FingerRating = () => {
  const webcamRef = useRef<Webcam>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [remark, setRemark] = useState("");
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const captureAndRate = async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) {
      alert("Webcam image could not be captured.");
      return;
    }

    const blob = await fetch(screenshot).then((res) => res.blob());
    setCapturedImage(blob);

    const formData = new FormData();
    formData.append("image", blob, "frame.jpg");

    try {
      const res = await axios.post("http://localhost:5000/rate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success" && typeof res.data.rating === "number") {
        setRating(res.data.rating);
      } else {
        setRating(null);
        alert("Failed to detect fingers. Please try again.");
      }
    } catch (err) {
      console.error("Error rating fingers:", err);
      alert("Server error while detecting fingers.");
    }
  };

  const submitReview = async () => {
    if (!capturedImage) {
      alert("No image available to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", capturedImage, "final_review.jpg");
    formData.append("remark", remark);

    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:5000/submit_review_image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success") {
        alert(res.data.message || "Review submitted successfully!");
        setRating(null);
        setRemark("");
        setCapturedImage(null);
      } else {
        alert("Failed to submit review.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("An error occurred while submitting the review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 text-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg mx-auto"
        width={320}
        height={240}
      />

      <button
        onClick={captureAndRate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        📸 Capture & Detect Fingers
      </button>

      {rating !== null && (
        <div className="mt-6">
          <p className="text-lg mb-2">Detected Rating:</p>
          <div className="text-3xl mb-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
          </div>

          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Optional remarks..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          <button
            onClick={submitReview}
            disabled={submitting}
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {submitting ? "Submitting..." : "✅ Submit Review"}
          </button>
        </div>
      )}
    </div>
  );
};

export default FingerRating;
