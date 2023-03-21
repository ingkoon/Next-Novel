import React from "react";
import style from "./CurrentStepTitle.module.css";

export default function CurrentStepTitle({ step }) {
  const title = [
    "",
    "장르",
    "소재",
    "결과",
    step === 4 ? "진행" : "결과",
    "완성",
  ];
  const flooredStep = Math.floor(step);
  return (
    <div className={style.container}>
      <div className={style.left}>
        <span>&gt;_STEP&nbsp;</span>
        <img
          src={process.env.PUBLIC_URL + `/icon/vector_step${flooredStep}.svg`}
          className={style.vector_step}
          alt="vector_step"
        ></img>
      </div>
      <div className={style.right}>
        <span>{title[flooredStep]}</span>
      </div>
    </div>
  );
}
