import React from "react";
import PreviewCanvas from "./PreviewCanvas";
import style from "./Preview.module.css";

type PreviewProps = {
  imageSrcs: (string | undefined)[];
  setSelected: React.Dispatch<React.SetStateAction<number>>;
};
export default function Preview({ imageSrcs, setSelected }: PreviewProps) {
  return (
    <div className={style.container}>
      <div className={style.scroll}>
        {imageSrcs.map((imageSrc, index) => (
          <PreviewCanvas
            key={index}
            imageSrc={imageSrc}
            setSelected={setSelected}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
