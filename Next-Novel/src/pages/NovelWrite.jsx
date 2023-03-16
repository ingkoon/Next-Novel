import React, { useState } from "react";
import AfterStartWrite from "../components/AfterStartWrite";
import BeforeStartWrite from "../components/BeforeStartWrite";

export default function NovelWrite() {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <BeforeStartWrite setStep={setStep} />}
      {step > 0 && <AfterStartWrite step={step} setStep={setStep} />}
    </>
  );
}
