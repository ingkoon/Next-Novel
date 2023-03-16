import React from "react";
import SelectOption from "./SelectOption";

export default function WriteStep4b({ setStep, count, setCount }) {
  return (
    <div>
      <SelectOption setStep={setStep} count={count} setCount={setCount} />
    </div>
  );
}
