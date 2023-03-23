import React from "react";
import Bottom from "./Bottom";
import style from "./WriteStep5a.module.css";

export default function WriteStep5a({ setStep, step }) {
  const button = () => setStep(5.5);
  return (
    <div className={style.container}>
      <div className={style.component}></div>
      <Bottom step={step} name="제출" button={button} />
    </div>
  );
}
