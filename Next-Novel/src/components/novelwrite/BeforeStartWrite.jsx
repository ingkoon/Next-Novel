import React, { useEffect, useState, useRef } from "react";
import TitleBar from "../common/TitleBar";
import style from "./BeforeStartWrite.module.css";
import Modal from "react-modal";
import Login from "../login/Login";

export default function BeforeStartWrite({ step, setStep }) {
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const start = () => {
    if (!localStorage.getItem("access_token")) {
      setLoginIsOpen(true);
      return;
    }
    setStep(1);
  };
  const closemodal = () => {
    setLoginIsOpen(false);
  };

  const typeitRef = useRef(null);
  useEffect(() => {
    const startTypingAnimation = () => {
      const instance = new window.TypeIt(typeitRef.current, {
        strings: ['내가 그리고','AI가 써주는 소설을','만들어볼까요?'],
        speed: 20,
        loop: false,
      });

      instance.go();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTypingAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1.0, // The observer callback will be called when the element is 100% visible
      }
    );

    if (typeitRef.current) {
      observer.observe(typeitRef.current);
    }

    return () => {
      if (typeitRef.current) {
        observer.unobserve(typeitRef.current);
      }
    };
  }, []);


  return (
    <div>
      <Modal
        closeTimeoutMS={200}
        isOpen={loginIsOpen}
        onRequestClose={() => setLoginIsOpen(false)}
        style={{
          overlay: {
            zIndex: "100",
          },
          content: {
            width: "400px",
            height: "500px",
            margin: "auto",
            padding: "0",
            borderRadius: "20px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Login closemodal={closemodal} />
      </Modal>
      <TitleBar
        name="작업실"
        intro="디테일이 생명입니다."
        subintro1="work-shop"
        subintro2="stajio"
        img="pen"
      />
      <div className={style.before_start_write_content}>
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
        <div className={style.before_start_write_box}>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <div className={style.before_start_write_box_content}>
            <img
              src={process.env.PUBLIC_URL + "/img/NN_LOGO.svg"}
              className={style.NN_LOGO}
              alt="NN_LOGO"
            />
            <div ref={typeitRef} className={style.typing}></div>
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
