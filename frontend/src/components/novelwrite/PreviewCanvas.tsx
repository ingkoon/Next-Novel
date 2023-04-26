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
    <div className={style.container} onClick={() => setSelected(index)}>
      {imageSrc && <img className={style.img} src={imageSrc} alt="img" />}
    </div>
  );
}
