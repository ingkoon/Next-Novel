import React, { useState } from "react";
import CurrentStepIcon from "./CurrentStepIcon";
import CurrentStepTitle from "./CurrentStepTitle";
import WriteStep1 from "./WriteStep1";
import WriteStep2 from "./WriteStep2";
import WriteStep3 from "./WriteStep3";
import WriteStep4a from "./WriteStep4a";
import WriteStep4b from "./WriteStep4b";
import WriteStep5a from "./WriteStep5a";
import WriteStep5b from "./WriteStep5b";
import style from "./AfterStartWrite.module.css";
import { NovelContextProvider } from "../../context/NovelContext";

export default function AfterStartWrite({ step, setStep }) {
  const [count, setCount] = useState(0);
  const [genre, setGenre] = useState(1);
  const genreName = ["", "romance", "fantasy", "mystery", "sf", "free"];

  return (
    <NovelContextProvider>
      <div>
        <div className={style.current_step}>
          <CurrentStepTitle step={step} />
          <CurrentStepIcon step={step} />
        </div>
        <div className={style.component}>
          {step <= 5 && (
            <>
              <img
                src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
                className={style.circle_left}
                alt="circle_left"
              />
              <img
                src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
                className={style.circle_right}
                alt="circle_right"
              />
            </>
          )}

          {step === 1 && (
            <WriteStep1
              setStep={setStep}
              genre={genre}
              setGenre={setGenre}
              step={step}
            />
          )}
          {step === 2 && (
            <WriteStep2
              setStep={setStep}
              step={step}
              genreName={genreName[genre]}
            />
          )}
          {step === 3 && (
            <WriteStep3
              setStep={setStep}
              count={count}
              setCount={setCount}
              step={step}
            />
          )}
          {step === 4 && (
            <WriteStep4a setStep={setStep} count={count} step={step} />
          )}
          {step === 4.5 && (
            <WriteStep4b
              setStep={setStep}
              count={count}
              setCount={setCount}
              step={step}
            />
          )}
          {step === 5 && <WriteStep5a setStep={setStep} step={step} />}
          {step === 5.5 && <WriteStep5b step={step} />}
        </div>
      </div>
    </NovelContextProvider>
  );
}
