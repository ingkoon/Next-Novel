import React from "react";

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
    <div>
      <h1>
        STEP {flooredStep} : {title[flooredStep]}
      </h1>
    </div>
  );
}
