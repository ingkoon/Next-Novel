import React from "react";
import style from "./PaintingInProgress.module.css";

export default function PaintingInProgress() {
  const data = {
    text: "그림",
    painting: process.env.PUBLIC_URL + `/img/painting.png`,
  };
  const tempDatas1 = Array.from({ length: 6 }, () => data);
  const tempDatas2 = Array.from({ length: 6 }, () => data);

  return (
    <div className={style.container}>
      <div className={style.scroll}>
        <div className={style.material}>
          {tempDatas1.map((tempData) => (
            <div>
              <img src={tempData.painting} alt="dd" />
              <span>{tempData.text}</span>
            </div>
          ))}
        </div>
        <div className={style.answer}>
          {tempDatas2.map((tempData) => (
            <div>
              <div></div>
              <img src={tempData.painting} alt="dd" />
              <span>{tempData.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
