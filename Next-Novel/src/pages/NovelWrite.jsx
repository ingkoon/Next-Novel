import React, { useState } from "react";
import AfterStartWrite from "../components/novelwrite/AfterStartWrite";
import BeforeStartWrite from "../components/novelwrite/BeforeStartWrite";

export default function NovelWrite() {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <BeforeStartWrite setStep={setStep} />}
      {step > 0 && <AfterStartWrite step={step} setStep={setStep} />}
    </>
  );
}
