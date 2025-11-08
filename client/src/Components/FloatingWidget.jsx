import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar.jsx";
import { FaMicrophone, FaStop, FaTimes } from "react-icons/fa";
import Chat from "./Chat";
import VoiceWave from "./Voicewave.jsx";




const FloatingWidget = ({ apiUrl = "http://localhost:5000/api/v1/send" }) => {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const [voiceMode, setVoiceMode] = useState(false);
  

  const stopConversationRef = useRef(false);

  const startListening = () => {
    if (isSpeakingRef.current || stopConversationRef.current) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => {
      setListening(false);
      if (!isSpeakingRef.current && !stopConversationRef.current) startListening();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      window.dispatchEvent(new CustomEvent("voice-agent-message", { detail: { text: transcript } }));
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  



  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setListening(false);
  };


  

  useEffect(() => {
    const handleVoiceStart = () => {
      isSpeakingRef.current = true;
      stopListening();
    };

    const handleVoiceEnd = () => {
      isSpeakingRef.current = false;
      if (voiceMode && !stopConversationRef.current) {
        startListening();
      }
    };

    window.addEventListener("voice-start", handleVoiceStart);
    window.addEventListener("voice-end", handleVoiceEnd);

    return () => {
      window.removeEventListener("voice-start", handleVoiceStart);
      window.removeEventListener("voice-end", handleVoiceEnd);
    };
  }, [voiceMode]);


  const stopConversation = () => {
    stopConversationRef.current = true;
    setVoiceMode(false);
    stopListening();
    speechSynthesis.cancel();
    setListening(false);
  };

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end">

      {open && (
        <div className="mb-3 w-[380px] backdrop-blur-lg bg-white/10 border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.4)] rounded-2xl overflow-hidden transition-all">

          <div className="flex items-center justify-between p-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Avatar />
              <div>
                <h3 className="text-slate-900 font-semibold">Voice Assistant</h3>
                <p className="text-xs text-gray-500">Ask anything.</p>
              </div>
            </div>

            <button onClick={() => setOpen(false)} className="text-gray-500 text-lg">
              <FaTimes />
            </button>
          </div>

          <div className="h-[380px] p-3 overflow-hidden">
            <Chat apiUrl={apiUrl} />
          </div>

          <div className="p-3 border-t border-white/10 bg-slate-700">
            <div className="flex items-center bg-black/40 rounded-xl px-3 py-2 border border-white/20">

              <div className="flex-1 text-gray-300 text-sm">
                {listening ? "Listening..." : "Tap mic to talk"}
              </div>

              {listening ? (
                <button onClick={stopListening} className="text-red-500 text-xl ml-2">
                  <FaStop />
                </button>
              ) : (
                <button onClick={() => {
                  stopConversationRef.current = false;
                  setVoiceMode(true);
                  startListening();
                }} className="text-gray-300 text-xl ml-2">
                  <FaMicrophone />
                </button>
              )}

              {/* End Conversation Button */}
              <button onClick={stopConversation} className="text-red-400 text-xs ml-3">
                End
              </button>

              <VoiceWave listening={listening} />
            </div>
          </div>
        </div>
      )}

      {/* Launcher */}
      <button onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center text-white ring-4 ring-white/10">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3z" stroke="white" strokeWidth="1.4" />
          <path d="M19 11v1a7 7 0 0 1-14 0v-1" stroke="white" strokeWidth="1.4" />
          <path d="M12 19v3" stroke="white" strokeWidth="1.4" />
        </svg>
      </button>

    </div>
  );
};

export default FloatingWidget;
