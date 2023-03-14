import React from "react";

export default function CurrentStepTitle({ step }) {
  const title = ["", "장르", "소재", "결과", ["진행", "결과"], "완성"];
  return (
    <div>
      <h1>
        STEP {step} : {title[step]}
      </h1>
    </div>
  );
}
