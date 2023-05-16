import React, { useState } from "react";
import TitleBar from "../common/TitleBar";
import style from "./BeforeStartWrite.module.css";
import LoginModal from "../common/LoginModal";
import TypeIt from "typeit-react";
import usePayment from "../../hooks/usePayment";

type BeforeStartWriteType = {
  setOrder: React.Dispatch<React.SetStateAction<string>>;
};

export default function BeforeStartWrite({ setOrder }: BeforeStartWriteType) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { getPoint } = usePayment();

  const start = async () => {
    if (!localStorage.getItem("access_token")) {
      setModalIsOpen(true);
      return;
    }
    const point = await getPointAsync();
    if (point < 10) {
      alert(
        "소설 작성에 필요한 포인트가 부족합니다!\n마이페이지에서 충전해주세요."
      );
      return;
    }

    setOrder("after");
  };

  async function getPointAsync() {
    try {
      const res = await getPoint();
      console.log(res);
      return res.data.point;
    } catch (e) {
      console.log(e);
    }
  }

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
            {/* <div ref={typeitRef} className={style.typing} /> */}
            <TypeIt
              options={{
                strings: ["내가 그리고", "AI가 써주는 소설을", "만들어볼까요?"],
                speed: 20,
                waitUntilVisible: true,
              }}
            />
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
