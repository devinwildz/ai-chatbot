import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const Chat = ({ apiUrl }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const scrollRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      const text = e.detail?.text;
      if (text) sendMessage(text);
    };
    window.addEventListener("voice-agent-message", handler);
    return () => window.removeEventListener("voice-agent-message", handler);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat]);

  const speak = (text) => {
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = /[\u0900-\u097F]/.test(text) ? "hi-IN" : "en-US";

    // signal voice start
    window.dispatchEvent(new Event("voice-start"));
    
    utter.onend = () => {
      // signal voice end
      window.dispatchEvent(new Event("voice-end"));
    };

    speechSynthesis.speak(utter);
  };

  const sendMessage = async (textParam) => {
    const text = (textParam ?? message).trim();
    if (!text) return;

    setChat((p) => [...p, { sender: "You", text }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(apiUrl, { message: text });
      const reply = res?.data?.data?.reply ?? res?.data?.reply ?? "No reply";

      setChat((p) => [...p, { sender: "Bot", text: reply }]);
      speak(reply);

    } catch (err) {
      console.error("sendMessage err", err);
      const errMsg = "Sorry, something went wrong.";
      setChat((p) => [...p, { sender: "Bot", text: errMsg }]);
      speak(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div ref={scrollRef} className="h-64 overflow-y-auto p-3 rounded-md bg-gray-900 border border-white/10 space-y-2">
        {chat.map((m, i) => (
          <div key={i} className={`p-2 rounded-md max-w-[85%] ${m.sender === "You" ? "ml-auto bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`}>
            <div className="text-xs font-semibold">{m.sender}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white border border-white/10"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type or use the mic"
        />
        <button onClick={() => sendMessage()} className="bg-blue-800 px-4 py-2 cursor-pointer rounded-lg text-white">
          Send
        </button>
      </div>

      <div className="mt-2 text-sm text-gray-400">{loading ? "Thinking..." : ""}</div>
    </div>
  );
};

export default Chat;
