import React from "react";
import TitleBar from "./TitleBar";
import "./BeforeStartWrite.css";

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
      <div className="before-start-write">
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className="circle_left"
          alt="circle_left"
        ></img>
        <div className="before-start-write-box">
          <span>내가 그리고 AI가 써주는 소설을 만들어볼까요?</span>
          <button onClick={() => setStep(1)}>시작하기</button>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className="circle_right"
          alt="circle_right"
        ></img>
      </div>
    </div>
  );
}
