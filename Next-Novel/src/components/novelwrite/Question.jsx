import React from "react";
import style from "./Question.module.css";

export default function Question({ count, question }) {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.Q}>Q.</div>
        <div className={style.count1}>{count}</div>
        <div className={style.count2}>/5</div>
        <div className={style.question}>{question}</div>
        <div className={style.dice}>
          <img src={process.env.PUBLIC_URL + `/icon/dice.svg`} alt="dice" />
        </div>
      </div>
      <div className={style.button}>
        <button>지금까지의 스토리 보기</button>
      </div>
    </div>
  );
}
