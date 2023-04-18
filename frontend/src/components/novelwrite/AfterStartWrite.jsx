import React from "react";
import CurrentStepIcon from "./CurrentStepIcon";
import CurrentStepTitle from "./CurrentStepTitle";
import WriteStep1 from "./WriteStep1";
import WriteStep2 from "./WriteStep2";
import WriteStep3 from "./WriteStep3";
import WriteStep4a from "./WriteStep4a";
import WriteStep4b from "./WriteStep4b";
import WriteStep5a from "./WriteStep5a";
import WriteStep5b from "./WriteStep5b";
import style from "./AfterStartWrite.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function AfterStartWrite() {
  const { step } = useNovelContext();

  return (
    <div className={style.container}>
      <div className={style.current_step}>
        <CurrentStepTitle />
        <CurrentStepIcon />
      </div>
      <div className={style.component}>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={`${style.circle_left} ${
            step <= 5 ? style.show : style.hide
          }`}
          alt="circle_left"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={`${style.circle_right} ${
            step <= 5 ? style.show : style.hide
          }`}
          alt="circle_right"
        />

        {step === 1 && <WriteStep1 />}
        {step === 2 && <WriteStep2 />}
        {step === 3 && <WriteStep3 />}
        {step === 4 && <WriteStep4a />}
        {step === 4.5 && <WriteStep4b />}
        {step === 5 && <WriteStep5a />}
        {step === 5.5 && <WriteStep5b />}
      </div>
    </div>
  );
}
