import React from "react";
import style from "./StoryInProgress.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function StoryInProgress() {
  const { novel } = useNovelContext();
  const wholeStory = [novel.startStory, ...novel.continueStory, novel.endStory];

  return (
    <div className={style.container}>
      <div className={style.scroll}>
        {wholeStory.map((page, index) => {
          if (index === 0) return page;
          return "\n\n" + page;
        })}
      </div>
    </div>
  );
}
