import React from "react";
import TitleBar from "./TitleBar";
import style from "./BeforeStartWrite.module.css";

export default function BeforeStartWrite({ step, setStep }) {
  return (
    <div>
      <TitleBar
        name="작업실"
        intro="디테일이 생명입니다."
        subintro1="work-shop"
        subintro2="stajio"
        img="pen"
      />
      <div className={style.before_start_write_content}>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={style.circle_left}
          alt="circle_left"
        ></img>
        <div className={style.before_start_write_box}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <div className={style.before_start_write_box_content}>
            <img
              src={process.env.PUBLIC_URL + "/img/NN_LOGO.svg"}
              className={style.NN_LOGO}
              alt="NN_LOGO"
            ></img>
            <span>
              내가 그리고
              <br />
              AI가 써주는 소설을
              <br />
              만들어볼까요?
            </span>
            <button onClick={() => setStep(1)}>시작하기</button>
          </div>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={style.circle_right}
          alt="circle_right"
        ></img>
      </div>
    </div>
  );
}
