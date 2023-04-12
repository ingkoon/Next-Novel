import React, { useState } from "react";
import Bottom from "./Bottom";
import PaintingInProgress from "./PaintingInProgress";
import SelectOption from "./SelectOption";
import StoryInProgress from "./StoryInProgress";
import style from "./WriteStep3.module.css";

export default function WriteStep3({ count, setCount }) {
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

        <SelectOption count={count} setCount={setCount} />
      </div>
      <Bottom
        name={whatInProgress === "story" ? "그림보기" : "글보기"}
        count={count}
        button={button}
      />
    </div>
  );
}
