import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas2 from "./Canvas2";

export default function WriteStep4a({ setStep, count, step }) {
  const [imageSrcs, setImageSrcs] = useState(undefined);
  const question = "나그네는 무엇을 주고 갔나요?";
  const button = () => setStep(4.5);

  return (
    <div>
      <div>
        <div>{count}/5</div>
        <div>{question}</div>
      </div>
      <button>지금까지의 스토리 보기</button>
      <Canvas2 imageSrcs={imageSrcs} setImageSrcs={setImageSrcs} />
      <Bottom step={step} name="제출" button={button} />
    </div>
  );
}
