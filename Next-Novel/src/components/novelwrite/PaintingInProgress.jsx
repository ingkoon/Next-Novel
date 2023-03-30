import React from "react";
import style from "./PaintingInProgress.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function PaintingInProgress() {
  const { novel } = useNovelContext();
  const data = {
    text: "그림",
    painting: process.env.PUBLIC_URL + `/img/painting.png`,
  };
  const tempDatas2 = Array.from({ length: 6 }, () => data);
  const materials = novel.materials;

  return (
    <div className={style.container}>
      <div className={style.scroll}>
        <div className={style.material}>
          {materials.map((material, index) => (
            <div key={index}>
              <img
                src={`http://localhost:8000` + material.image}
                alt="material_image"
              />
              <span>{material.caption}</span>
            </div>
          ))}
        </div>
        <div className={style.answer}>
          {tempDatas2.map((tempData, index) => (
            <div key={index}>
              <div />
              <img src={tempData.painting} alt="dd" />
              <span>{tempData.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
