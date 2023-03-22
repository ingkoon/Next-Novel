import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas2 from "./Canvas2";
import Question from "./Question";
import style from "./WriteStep4a.module.css";

export default function WriteStep4a({ setStep, count, step }) {
  const [imageSrcs, setImageSrcs] = useState(undefined);
  const question = "나그네는 무엇을 주고 갔나요? 나그네는 무엇을 주고 갔나요?";
  const button = () => setStep(4.5);

  return (
    <div className={style.container}>
      <div className={style.component}>
        <Question count={count} question={question} />
        <Canvas2 imageSrcs={imageSrcs} setImageSrcs={setImageSrcs} />
        <div className={style.temp}></div>
      </div>
      <Bottom step={step} name="제출" button={button} />
    </div>
  );
}
