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
import { useNovelContext } from "../../context/NovelContext";

export default function AfterStartWrite() {
  const { step } = useNovelContext();
  const [count, setCount] = useState(0);
  const [genre, setGenre] = useState(1);
  const genreName = ["", "romance", "fantasy", "mystery", "sf", "free"];

  return (
    <div>
      <div className={style.current_step}>
        <CurrentStepTitle />
        <CurrentStepIcon />
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

        {step === 1 && <WriteStep1 genre={genre} setGenre={setGenre} />}
        {step === 2 && <WriteStep2 genreName={genreName[genre]} />}
        {step === 3 && <WriteStep3 count={count} setCount={setCount} />}
        {step === 4 && <WriteStep4a count={count} />}
        {step === 4.5 && <WriteStep4b count={count} setCount={setCount} />}
        {step === 5 && <WriteStep5a />}
        {step === 5.5 && <WriteStep5b />}
      </div>
    </div>
  );
}
