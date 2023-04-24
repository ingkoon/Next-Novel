import React from "react";
import style from "./WriteStep1.module.css";
import GenreCard from "./GenreCard";
import Bottom from "./Bottom";
import { useNovelContext } from "../../context/NovelContext";
import genreInfos from "../../data/genreInfos.json";

export default function WriteStep1() {
  const { setStep } = useNovelContext();
  const button = () => setStep(2);

  return (
    <div className={style.container}>
      <div className={style.component}>
        {genreInfos.map((genreInfo, index) => (
          <GenreCard key={index} genreInfo={genreInfo} />
        ))}
      </div>
      <Bottom name="다음" button={button} />
    </div>
  );
}
