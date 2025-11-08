import React from "react";
import ReactDOM from "react-dom/client";
import Widget from "./Widget";

function initAIWidget() {
  let container = document.getElementById("ai-agent-widget-container");
  
  if (!container) {
    container = document.createElement("div");
    container.id = "ai-agent-widget-container";
    document.body.appendChild(container);
  }

  ReactDOM.createRoot(container).render(<Widget />);
}

// Expose init fn to window
window.initAIWidget = initAIWidget;
