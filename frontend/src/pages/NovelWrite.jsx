import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AfterStartWrite from "../components/novelwrite/AfterStartWrite";
import BeforeStartWrite from "../components/novelwrite/BeforeStartWrite";
import { useNovelContext } from "../context/NovelContext";

export default function NovelWrite() {
  const { state } = useLocation();
  const { step, setStep } = useNovelContext();

  useEffect(() => {
    setStep(0);
  }, [state]);

  return (
    <>
      {step === 0 && <BeforeStartWrite />}
      {step > 0 && <AfterStartWrite />}
    </>
  );
}
