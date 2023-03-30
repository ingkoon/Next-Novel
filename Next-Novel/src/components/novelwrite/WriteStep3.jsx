import React, { useState } from "react";
import Bottom from "./Bottom";
import PaintingInProgress from "./PaintingInProgress";
import SelectOption from "./SelectOption";
import StoryInProgress from "./StoryInProgress";
import style from "./WriteStep3.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function WriteStep3({ setStep, count, setCount, step }) {
  const [whatInProgress, setWhatInProgress] = useState("story");
  const { novel } = useNovelContext();

  const button = () =>
    whatInProgress === "story"
      ? setWhatInProgress("painting")
      : setWhatInProgress("story");

  return (
    <div className={style.container}>
      <div className={style.component}>
        {whatInProgress === "story" && <StoryInProgress novel={novel} />}
        {whatInProgress === "painting" && <PaintingInProgress novel={novel} />}

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
