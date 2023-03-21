import React, { useState } from "react";
import Guide from "./Guide";
import PaintingInProgress from "./PaintingInProgress";
import SelectOption from "./SelectOption";
import StoryInProgress from "./StoryInProgress";

export default function WriteStep4b({ setStep, count, setCount, step }) {
  const [whatInProgress, setWhatInProgress] = useState("story");
  return (
    <div>
      {whatInProgress === "story" && <StoryInProgress />}
      {whatInProgress === "painting" && <PaintingInProgress />}

      <SelectOption setStep={setStep} count={count} setCount={setCount} />
      {whatInProgress === "story" && (
        <button onClick={() => setWhatInProgress("painting")}>그림 보기</button>
      )}
      {whatInProgress === "painting" && (
        <button onClick={() => setWhatInProgress("story")}>글 보기</button>
      )}
      <Guide step={step} count={count} />
    </div>
  );
}
