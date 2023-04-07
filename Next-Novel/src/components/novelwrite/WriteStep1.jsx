import React from "react";
import style from "./WriteStep1.module.css";
import GenreCard from "./GenreCard";
import Bottom from "./Bottom";

export default function WriteStep1({ setStep, genre, setGenre, step }) {
  const genreInfos = [
    {
      name: "로맨스",
      desc: ["꼭 해피엔딩으로", "끝나는 것은 아닙니다."],
      value: 1,
    },
    {
      name: "판타지",
      desc: ["충분히 발달한 과학기술은", "마법과 구별할 수 없다죠."],
      value: 2,
    },
    {
      name: "추리",
      desc: ["베이커가 221B 번지로", "지원 요청합니다."],
      value: 3,
    },
    { name: "SF", desc: ["인간M&x시대의u9", "끝bQ이Ai도래했다7v6"], value: 4 },
    { name: "자유", desc: ["- 오마카세 -", "저희에게 맡겨주세요."], value: 5 },
  ];
  const button = () => setStep(2);

  return (
    <div className={style.container}>
      <div className={style.component}>
        {genreInfos.map((genreInfo, index) => (
          <GenreCard
            key={index}
            genreInfo={genreInfo}
            genre={genre}
            setGenre={setGenre}
          />
        ))}
      </div>
      <Bottom step={step} name="다음" button={button} />
    </div>
  );
}
