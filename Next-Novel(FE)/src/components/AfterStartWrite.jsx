import React, { useState } from "react";
import CurrentStepIcon from "./CurrentStepIcon";
import CurrentStepTitle from "./CurrentStepTitle";
import WriteStep1 from "./WriteStep1";
import WriteStep2 from "./WriteStep2";
import WriteStep3 from "./WriteStep3";
import WriteStep4 from "./WriteStep4";
import WriteStep5 from "./WriteStep5";

export default function AfterStartWrite({ step, setStep }) {
  const [count, setCount] = useState(0);
  const [step2, setStep2] = useState(0);

  return (
    <div>
      <CurrentStepTitle step={step} />
      <CurrentStepIcon step={step} />
      {step === 1 && <WriteStep1 setStep={setStep} />}
      {step === 2 && <WriteStep2 setStep={setStep} />}
      {step === 3 && (
        <WriteStep3
          setStep={setStep}
          step2={step2}
          setStep2={setStep2}
          count={count}
          setCount={setCount}
        />
      )}
      {step === 4 && (
        <WriteStep4
          setStep={setStep}
          step2={step2}
          setStep2={setStep2}
          count={count}
          setCount={setCount}
        />
      )}
      {step === 5 && <WriteStep5 />}
    </div>
  );
}
