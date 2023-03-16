import React from "react";

export default function WriteStep1({ setStep }) {
  return (
    <div>
      <button onClick={() => setStep(2)}>다음</button>
    </div>
  );
}
