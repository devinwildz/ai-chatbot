(function () {
  const script = document.createElement("script");
  script.src = "https://localhost:5173/src/widget-entry.js"; // dev test
  script.type = "module";

  script.onload = () => {
    // run widget
    window.initAIWidget();
  };

  document.body.appendChild(script);
})();
