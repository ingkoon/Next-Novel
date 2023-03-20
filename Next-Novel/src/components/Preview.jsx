import React from "react";
import PreviewCanvas from "./PreviewCanvas";
import "./Preview.module.css";

export default function Preview({ imageSrcs, setSelected }) {
  return (
    <div className="preview-container">
      {imageSrcs.map((imageSrc, index) => (
        <PreviewCanvas
          key={index}
          imageSrc={imageSrc}
          setSelected={setSelected}
          index={index}
        />
      ))}
    </div>
  );
}
