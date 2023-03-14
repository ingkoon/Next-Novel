import React, { useState } from "react";
import WriteStep4a from "./WriteStep4a";
import WriteStep4b from "./WriteStep4b";

export default function WriteStep4({ setStep }) {
  const [step2, setStep2] = useState(0);

  return (
    <div>
      {step2 === 0 && <WriteStep4a setStep2={setStep2} />}
      {step2 !== 0 && <WriteStep4b setStep={setStep} setStep2={setStep2} />}
    </div>
  );
}
