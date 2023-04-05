import React from "react";
import style from "./StoryInProgress.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function StoryInProgress() {
  const { novel } = useNovelContext();

  return (
    <div className={style.container}>
      <div className={style.scroll}>{novel.story}</div>
    </div>
  );
}
