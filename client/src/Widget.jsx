import React from "react";
import FloatingWidget from "./Components/FloatingWidget";

export default function Widget() {
  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 999999 }}>
     <FloatingWidget />
    </div>
  );
}
