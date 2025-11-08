import React from "react";

const VoiceWave = ({ listening = false }) => {
  return (
    <div className="flex items-center gap-1 ml-2 h-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className={`block w-1 rounded-sm ${listening ? `animate-wave-delay-${i}` : "bg-white/30 h-2"}`}
          style={{ background: "linear-gradient(180deg,#fff,#a78bfa)" }}
        />
      ))}

      <style>{`
        @keyframes wave {
          0% { height: 6px; opacity: .6; }
          50% { height: 20px; opacity: 1; }
          100% { height: 6px; opacity: .6; }
        }
        .animate-wave-delay-0 { animation: wave 700ms infinite ease-in-out; animation-delay: 0ms; height: 6px; }
        .animate-wave-delay-1 { animation: wave 700ms infinite ease-in-out; animation-delay: 80ms; height: 6px; }
        .animate-wave-delay-2 { animation: wave 700ms infinite ease-in-out; animation-delay: 160ms; height: 6px; }
        .animate-wave-delay-3 { animation: wave 700ms infinite ease-in-out; animation-delay: 240ms; height: 6px; }
        .animate-wave-delay-4 { animation: wave 700ms infinite ease-in-out; animation-delay: 320ms; height: 6px; }
        .animate-wave-delay-5 { animation: wave 700ms infinite ease-in-out; animation-delay: 400ms; height: 6px; }
      `}</style>
    </div>
  );
};

export default VoiceWave;
