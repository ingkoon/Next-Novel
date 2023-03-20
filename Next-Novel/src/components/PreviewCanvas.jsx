import React from "react";
import style from "./PreviewCanvas.module.css";

export default function PreviewCanvas({ imageSrc, setSelected, index }) {
  return (
    <>
      <img
        className={style.preview_canvas}
        src={imageSrc}
        alt="ㅇㅇ"
        onClick={() => setSelected(index)}
      />
    </>
  );
}
