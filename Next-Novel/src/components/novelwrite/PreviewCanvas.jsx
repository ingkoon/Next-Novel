import React from "react";
import style from "./PreviewCanvas.module.css";

export default function PreviewCanvas({ imageSrc, setSelected, index }) {
  return (
    <div className={style.container}>
      <img
        className={style.img}
        src={imageSrc}
        alt="ㅇㅇ"
        onClick={() => setSelected(index)}
      />
    </div>
  );
}
