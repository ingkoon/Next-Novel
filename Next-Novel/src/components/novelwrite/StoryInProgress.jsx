import React from "react";
import style from "./StoryInProgress.module.css";

export default function StoryInProgress({ novel }) {
  return (
    <div className={style.container}>
      <div className={style.scroll}>{novel.story}</div>
    </div>
  );
}
