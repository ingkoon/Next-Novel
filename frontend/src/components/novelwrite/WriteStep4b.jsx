import React, { useState } from "react";
import Bottom from "./Bottom";
import PaintingInProgress from "./PaintingInProgress";
import SelectOption from "./SelectOption";
import StoryInProgress from "./StoryInProgress";
import style from "./WriteStep4b.module.css";

export default function WriteStep4b({ setStep, count, setCount, step }) {
  const [whatInProgress, setWhatInProgress] = useState("story");

  const button = () =>
    whatInProgress === "story"
      ? setWhatInProgress("painting")
      : setWhatInProgress("story");

  return (
    <div className={style.container}>
      <div className={style.component}>
        {whatInProgress === "story" && <StoryInProgress />}
        {whatInProgress === "painting" && <PaintingInProgress />}

        <SelectOption setStep={setStep} count={count} setCount={setCount} />
      </div>
      <Bottom
        step={step}
        name={whatInProgress === "story" ? "그림보기" : "글보기"}
        count={count}
        button={button}
      />
    </div>
  );
}
