"use client";

import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Silk from "@/components/Silk";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import { Hands } from "@mediapipe/hands";

const FingerRating = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fingerCount, setFingerCount] = useState<number>(0);
  const [rating, setRating] = useState<number | null>(null);
  const [remark, setRemark] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const startCountdownAndCapture = () => {
    let timeLeft = 5;
    setCountdown(timeLeft);

    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft === 0) {
        clearInterval(interval);
        setCountdown(null);
        captureAndRate();
      } else {
        setCountdown(timeLeft);
      }
    }, 1000);
  };

  const captureAndRate = async () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (!screenshot) {
      alert("Webcam image could not be captured.");
      return;
    }

    const blob = await fetch(screenshot).then((res) => res.blob());
    setCapturedImage(blob);

    const formData = new FormData();
    formData.append("image", blob, "frame.joinpg");

    try {
      const res = await axios.post("https://funzonebackend.onrender.com/rate", formData, {
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
      const res = await axios.post("https://funzonebackend.onrender.com/submit_review_image", formData, {
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

  const countRaisedFingers = (landmarks: any) => {
    let count = 0;
    if (landmarks[4].x > landmarks[3].x) count++;

    const tips = [8, 12, 16, 20];
    const pips = [6, 10, 14, 18];

    for (let i = 0; i < tips.length; i++) {
      if (landmarks[tips[i]].y < landmarks[pips[i]].y) count++;
    }

    return count;
  };

  useEffect(() => {
    let cameraInstance: any = null;

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        const count = countRaisedFingers(landmarks);
        setFingerCount(count);

        drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
          color: "white",
          lineWidth: 3,
        });

        drawLandmarks(ctx, landmarks, {
          color: "#6F2DA8", // Purple
          lineWidth: 2,
        });

        ctx.font = "bold 30px Arial";
        ctx.fillStyle = "#6F2DA8";
        ctx.fillText(`Fingers: ${count}`, 10, 40);
      }

      ctx.restore();
    });

    const interval = setInterval(() => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        clearInterval(interval);

        cameraInstance = new cam.Camera(webcamRef.current.video, {
          onFrame: async () => {
            await hands.send({ image: webcamRef.current!.video! });
          },
          width: 640,
          height: 480,
        });

        cameraInstance.start();
      }
    }, 100);

    return () => {
      if (cameraInstance) cameraInstance.stop();

      if (webcamRef.current?.video?.srcObject) {
        const tracks = (webcamRef.current.video.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Silk />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-[640px] h-[480px] rounded-lg overflow-hidden bg-black">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ width: 640, height: 480 }}
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />

          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none"
          />
        </div>

        <button
          onClick={startCountdownAndCapture}
          className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700"
          disabled={countdown !== null}
        >
          {countdown !== null ? `Capturing in ${countdown}...` : "📸 Capture & Detect Fingers"}
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
    </div>
  );
};

export default FingerRating;

