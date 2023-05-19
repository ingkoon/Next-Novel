import React from "react";
import style from "./PaintingInProgress.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function PaintingInProgress() {
  const { novel } = useNovelContext();

  return (
    <div className={style.container}>
      <div className={style.scroll}>
        <div className={style.material}>
          {novel.materials.map((material, index) => (
            <div key={index}>
              <img src={material.image} alt="" />
              <span>{material.caption}</span>
            </div>
          ))}
        </div>
        <div className={style.answer}>
          {novel.newMaterials.map((newMaterial, index) => (
            <div key={index}>
              <div />
              <img src={newMaterial.image} alt="" />
              <span>{newMaterial.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
