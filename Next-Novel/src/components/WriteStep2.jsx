import React from "react";
import Canvas from "./Canvas";

export default function WriteStep2({ setStep }) {
  return (
    <div>
      <Canvas />
      <button onClick={() => setStep(3)}>제출</button>
    </div>
  );
}
