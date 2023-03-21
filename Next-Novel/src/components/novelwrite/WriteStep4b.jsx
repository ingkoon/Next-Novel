import React, { useState } from "react";
import Bottom from "./Bottom";
import PaintingInProgress from "./PaintingInProgress";
import SelectOption from "./SelectOption";
import StoryInProgress from "./StoryInProgress";

export default function WriteStep4b({ setStep, count, setCount, step }) {
  const [whatInProgress, setWhatInProgress] = useState("story");

  const button = () =>
    whatInProgress === "story"
      ? setWhatInProgress("painting")
      : setWhatInProgress("story");

  return (
    <div>
      {whatInProgress === "story" && <StoryInProgress />}
      {whatInProgress === "painting" && <PaintingInProgress />}

      <SelectOption setStep={setStep} count={count} setCount={setCount} />
      <Bottom
        step={step}
        name={whatInProgress === "story" ? "그림보기" : "글보기"}
        count={count}
        button={button}
      />
    </div>
  );
}
