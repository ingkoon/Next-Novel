import React from "react";
import Canvas from "./Canvas";

export default function WriteStep4a({ setStep2 }) {
  return (
    <div>
      <Canvas />
      <button onClick={() => setStep2(1)}>제출</button>
    </div>
  );
}
