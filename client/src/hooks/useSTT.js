import { useEffect, useState } from "react";

export function useSTT() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    // Initialize media recording setup
    const initSTT = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new (window.MediaRecorder ||
          window.webkitMediaRecorder)(stream);

        const chunks = [];

        recorder.ondataavailable = (event) => {
          chunks.push(event.data);
        };

        recorder.onstop = async () => {
          setIsProcessing(true);
          try {
            const audioBlob = new Blob(chunks, { type: "audio/wav" });

            // Send to backend for transcription
            const formData = new FormData();
            formData.append("audio", audioBlob);

            const response = await fetch("/api/transcribe", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "stickyAiToken"
                )}`,
              },
              body: formData,
            });

            if (!response.ok) {
              throw new Error("Transcription failed");
            }

            const data = await response.json();
            setTranscript(data.transcript || "");
          } catch (err) {
            console.error("Transcription error:", err);
            setError("Failed to transcribe audio");
          } finally {
            setIsProcessing(false);
          }
        };

        setMediaRecorder(recorder);
        console.log("✅ STT engine initialized");
      } catch (error) {
        console.error("Failed to initialize STT:", error);
        setError("Microphone access denied");
      }
    };

    initSTT();
  }, []);

  const startRecording = async () => {
    if (!mediaRecorder) {
      setError("Recording not available");
      return;
    }

    try {
      setIsRecording(true);
      setTranscript("");
      setError(null);
      mediaRecorder.start();
    } catch (error) {
      console.error("Recording error:", error);
      setIsRecording(false);
      setError("Failed to start recording");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    transcript,
    isProcessing,
    error,
    startRecording,
    stopRecording,
  };
}
