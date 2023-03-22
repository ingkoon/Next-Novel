import React from "react";
import style from "./PreviewCanvas.module.css";

export default function PreviewCanvas({ imageSrc, setSelected, index }) {
  return (
    <div className={style.container} onClick={() => setSelected(index)}>
      {imageSrc && <img className={style.img} src={imageSrc} alt="img" />}
    </div>
  );
}
