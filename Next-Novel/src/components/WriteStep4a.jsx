import React from "react";
import Canvas from "./Canvas";

export default function WriteStep4a({ setStep }) {
  return (
    <div>
      <Canvas />
      <button onClick={() => setStep(4.5)}>제출</button>
    </div>
  );
}
