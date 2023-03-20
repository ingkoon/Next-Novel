import React from "react";

export default function CurrentStepIcon({ step }) {
  const flooredStep = Math.floor(step);
  return (
    <div>
      <h1>{flooredStep}</h1>
    </div>
  );
}
