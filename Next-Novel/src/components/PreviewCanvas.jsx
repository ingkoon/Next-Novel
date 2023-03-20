import React from "react";
import "./PreviewCanvas.module.css";

export default function PreviewCanvas({ imageSrc, setSelected, index }) {
  return (
    <>
      <img
        className="preview-canvas"
        src={imageSrc}
        alt="ㅇㅇ"
        onClick={() => setSelected(index)}
      />
    </>
  );
}
