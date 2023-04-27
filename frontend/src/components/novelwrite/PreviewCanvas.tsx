import React from "react";
import style from "./PreviewCanvas.module.css";

type PreviewCanvasProps = {
  imageSrc: string | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};
export default function PreviewCanvas({
  imageSrc,
  setSelected,
  index,
}: PreviewCanvasProps) {
  return (
    <>
      {imageSrc && (
        <img
          className={style.img}
          src={imageSrc}
          alt="img"
          onClick={() => setSelected(index)}
        />
      )}
      {!imageSrc && (
        <span className={style.img} onClick={() => setSelected(index)} />
      )}
    </>
  );
}
