import React from "react";
import style from "./Guide.module.css";

export default function Guide({ step, count, isShaking }) {
  const desc = [
    "",
    "소설의 장르를 선택하세요",
    "소설을 구성할 6개의 소재(명사)를 그려주세요.",
    `${count + 1}번째 페이지 내용이 작성되었습니다.`,
    step === 4
      ? "질문에 대한 답을 그림으로 그려 스토리를 이어나가세요."
      : `${count + 1}번째 페이지 내용이 작성되었습니다.`,
    step === 5
      ? "그린 그림을 바탕으로 표지를 생성합니다."
      : "책의 표지, 제목, 한줄소개글을 저장하고\nFin을 눌러 완성하세요.",
  ];
  const flooredStep = Math.floor(step);

  return (
    <div className={style.container}>
      <div className={isShaking ? style.shake : ""}>
        <img
          src={process.env.PUBLIC_URL + `/icon/question_mark.svg`}
          alt="question_mark"
        />
        <span>{desc[flooredStep]}</span>
      </div>
    </div>
  );
}
