import React from "react";
import style from "./PaintingInProgress.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function PaintingInProgress() {
  const { novel } = useNovelContext();
  const materials = novel.materials;
  const newMaterials = novel.newMaterials;

  return (
    <div className={style.container}>
      <div className={style.scroll}>
        <div className={style.material}>
          {materials.map((material, index) => (
            <div key={index}>
              <img
                src={process.env.REACT_APP_IMAGE_API + material.image}
                alt=""
              />
              <span>{material.caption}</span>
            </div>
          ))}
        </div>
        <div className={style.answer}>
          {newMaterials.map((newMaterial, index) => (
            <div key={index}>
              <div />
              <img
                src={process.env.REACT_APP_IMAGE_API + newMaterial.image}
                alt=""
              />
              <span>{newMaterial.caption}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
