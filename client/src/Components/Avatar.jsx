// src/components/Avatar.jsx
import React from "react";

const Avatar = () => {
  return (
    <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center relative">
      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center font-bold text-indigo-600">DV</div>
      <span className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-green-400 ring-2 ring-white" />
      <style>{`
        /* simple blink for avatar eyes feel - small scale pulse */
        @keyframes blink {
          0%, 70%, 100% { transform: scaleY(1); }
          75% { transform: scaleY(.2); }
        }
        .avatar-blink { animation: blink 3s infinite; transform-origin: center; }
      `}</style>
    </div>
  );
};

export default Avatar;
