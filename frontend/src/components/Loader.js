import React from "react";
import "./Loader.css";

function Loader({ size = "medium", text = "" }) {
  return (
    <div className="loader-container">
      <div className={`loader ${size}`}>
        <div className="spinner"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
}

export default Loader;
