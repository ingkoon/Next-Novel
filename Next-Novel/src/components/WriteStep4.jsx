import React from "react";
import WriteStep4a from "./WriteStep4a";
import WriteStep4b from "./WriteStep4b";

export default function WriteStep4({
  setStep,
  step2,
  setStep2,
  count,
  setCount,
}) {
  return (
    <>
      {step2 === 0 && <WriteStep4a setStep2={setStep2} />}
      {step2 !== 0 && (
        <WriteStep4b
          setStep={setStep}
          setStep2={setStep2}
          count={count}
          setCount={setCount}
        />
      )}
    </>
  );
}
