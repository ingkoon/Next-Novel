import React from "react";

export default function WriteStep4a({ setStep2 }) {
  return (
    <div>
      <button onClick={() => setStep2(1)}>제출</button>
    </div>
  );
}
