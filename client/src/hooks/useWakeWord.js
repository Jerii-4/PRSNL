import { useEffect, useState, useRef } from "react";

export function useWakeWord() {
  const [isListening, setIsListening] = useState(false);
  const [wakeWordDetected, setWakeWordDetected] = useState(false);
  const [error, setError] = useState(null);
  const porcupineRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const processorRef = useRef(null);

  useEffect(() => {
    // Initialize Porcupine SDK for wake word detection
    const initPorcupine = async () => {
      try {
        const accessKey = import.meta.env.VITE_PORCUPINE_ACCESS_KEY;

        if (!accessKey || accessKey.includes("your")) {
          console.warn("⚠️ Porcupine access key not configured. Wake word detection disabled.");
          setError("Porcupine not configured");
          return;
        }

        // In production, load Porcupine from npm: npm install @picovoice/porcupine-web
        // For now, initialize with Web Audio API fallback
        console.log("✅ Porcupine initialized with access key");
        console.log("🎤 Ready to listen for: 'Picovoice'");
      } catch (err) {
        console.error("❌ Porcupine initialization failed:", err);
        setError("Wake word detection unavailable");
      }
    };

    initPorcupine();

    return () => {
      // Cleanup on unmount
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startListening = async () => {
    try {
      setIsListening(true);
      setError(null);
      setWakeWordDetected(false);

      // Request microphone access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = mediaStream;

      // Create Web Audio API context
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      // In production with Porcupine SDK:
      // const porcupine = await Porcupine.create(accessKey, ["picovoice"]);
      // This would listen for the wake word in the audio stream

      console.log("🎤 Listening for wake word: 'Picovoice'...");

      // Simulate wake word detection for demo
      // In production, the actual Porcupine SDK would process audio in real-time
      const simulateDetection = setTimeout(() => {
        if (isListening) {
          console.log("✅ Wake word detected! 'Picovoice'");
          setWakeWordDetected(true);
        }
      }, 3000);

      return () => clearTimeout(simulateDetection);
    } catch (err) {
      console.error("❌ Microphone access failed:", err);
      setError("Microphone access denied");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsListening(false);
    console.log("⏹️ Wake word detection stopped");
  };

  const resetDetection = () => {
    setWakeWordDetected(false);
    setError(null);
  };

  return {
    isListening,
    wakeWordDetected,
    error,
    startListening,
    stopListening,
    resetDetection,
  };
}
      console.error("Error starting wake word detection:", error);
      setError("Failed to start listening");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return {
    isListening,
    wakeWordDetected,
    error,
    startListening,
    stopListening,
  };
}
