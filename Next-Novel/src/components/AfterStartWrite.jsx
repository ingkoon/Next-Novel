import React, { useState } from "react";
import CurrentStepIcon from "./CurrentStepIcon";
import CurrentStepTitle from "./CurrentStepTitle";
import WriteStep1 from "./WriteStep1";
import WriteStep2 from "./WriteStep2";
import WriteStep3 from "./WriteStep3";
import WriteStep4a from "./WriteStep4a";
import WriteStep4b from "./WriteStep4b";
import WriteStep5 from "./WriteStep5";

export default function AfterStartWrite({ step, setStep }) {
  const [count, setCount] = useState(0);
  const [genre, setGenre] = useState(1);

  return (
    <div>
      <CurrentStepTitle step={step} />
      <CurrentStepIcon step={step} />
      {step === 1 && (
        <WriteStep1 setStep={setStep} genre={genre} setGenre={setGenre} />
      )}
      {step === 2 && <WriteStep2 setStep={setStep} />}
      {step === 3 && (
        <WriteStep3 setStep={setStep} count={count} setCount={setCount} />
      )}
      {step === 4 && <WriteStep4a setStep={setStep} />}
      {step === 4.5 && (
        <WriteStep4b setStep={setStep} count={count} setCount={setCount} />
      )}
      {step === 5 && <WriteStep5 genre={genre} />}
    </div>
  );
}
