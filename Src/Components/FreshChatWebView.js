import React, { useEffect } from "react";

const FreshChatWebView = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//uae.fw-cdn.com/40295746/183353.js";
    script.setAttribute("chat", "true");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div style={{ height: "100vh" }} id="app" />;
};

export default FreshChatWebView;
