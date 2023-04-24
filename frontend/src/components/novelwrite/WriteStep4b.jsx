import React, { useState } from "react";
import Bottom from "./Bottom";
import PaintingInProgress from "./PaintingInProgress";
import SelectOption from "./SelectOption";
import StoryInProgress from "./StoryInProgress";
import style from "./WriteStep4b.module.css";

export default function WriteStep4b() {
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

        <SelectOption />
      </div>
      <Bottom
        name={whatInProgress === "story" ? "그림보기" : "글보기"}
        button={button}
      />
    </div>
  );
}
