import React from "react";
import CurrentStepIcon from "./CurrentStepIcon";
import CurrentStepTitle from "./CurrentStepTitle";
import WriteStep1 from "./WriteStep1";
import WriteStep2 from "./WriteStep2";
import WriteStep3 from "./WriteStep3";
import WriteStep4 from "./WriteStep4";
import WriteStep5 from "./WriteStep5";

export default function AfterStartWrite({ step, setStep }) {
  return (
    <div>
      <CurrentStepTitle step={step} />
      <CurrentStepIcon step={step} />
      {step === 1 && <WriteStep1 setStep={setStep} />}
      {step === 2 && <WriteStep2 setStep={setStep} />}
      {step === 3 && <WriteStep3 setStep={setStep} />}
      {step === 4 && <WriteStep4 setStep={setStep} />}
      {step === 5 && <WriteStep5 />}
    </div>
  );
}
