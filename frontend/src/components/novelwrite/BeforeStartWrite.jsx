import React, { useState } from "react";
import TitleBar from "../common/TitleBar";
import style from "./BeforeStartWrite.module.css";
import { useNovelContext } from "../../context/NovelContext";
import useTypeit from "../../hooks/useTypeit";
import LoginModal from "../common/LoginModal";

export default function BeforeStartWrite() {
  const { setStep } = useNovelContext();
  const [typeitRef] = useTypeit({
    content: ["내가 그리고", "AI가 써주는 소설을", "만들어볼까요?"],
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const start = () => {
    // if (!localStorage.getItem("access_token")) {
    //   setModalIsOpen(true);
    //   return;
    // }
    setStep(1);
  };

  return (
    <div>
      <LoginModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <TitleBar
        name="작업실"
        intro="디테일이 생명입니다."
        subintro1="work-shop"
        subintro2="stajio"
        img="pen"
      />
      <div className={style.content}>
        <img
          src={process.env.PUBLIC_URL + "/img/orange_path.svg"}
          className={style.orange_path}
          alt="orange_path"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={style.circle_left}
          alt="circle_left"
        />
        <div className={style.box}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <div className={style.box_content}>
            <img
              src={process.env.PUBLIC_URL + "/img/NN_LOGO.svg"}
              className={style.NN_LOGO}
              alt="NN_LOGO"
            />
            <div ref={typeitRef} className={style.typing} />
            <button onClick={start}>시작하기</button>
          </div>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={style.circle_right}
          alt="circle_right"
        />
      </div>
    </div>
  );
}
