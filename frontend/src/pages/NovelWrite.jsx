import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AfterStartWrite from "../components/novelwrite/AfterStartWrite";
import BeforeStartWrite from "../components/novelwrite/BeforeStartWrite";

export default function NovelWrite() {
  const [step, setStep] = useState(0);
  const { state } = useLocation();

  useEffect(() => {
    setStep(0);
  }, [state]);

  return (
    <>
      {step === 0 && <BeforeStartWrite setStep={setStep} />}
      {step > 0 && <AfterStartWrite step={step} setStep={setStep} />}
    </>
  );
}
