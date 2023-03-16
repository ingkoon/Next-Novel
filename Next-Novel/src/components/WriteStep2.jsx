import React from "react";

export default function WriteStep2({ setStep }) {
  return (
    <div>
      <button onClick={() => setStep(3)}>제출</button>
    </div>
  );
}
