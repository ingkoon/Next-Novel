import React, { useState } from "react";
import style from "./Question.module.css";
import Modal from "react-modal";
import StoryInProgress from "./StoryInProgress";

export default function Question({ count, question }) {
  const [IsOpen, setIsOpen] = useState(false);

  const closemodal = () => {
    setIsOpen(false);
  };

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
        <button onClick={() => setIsOpen(true)}>지금까지의 스토리 보기</button>
      </div>
      <Modal
        isOpen={IsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: {},
          content: {
            width: "608px",
            height: "380px",
            margin: "auto",
            padding: "0",
            borderRadius: "20px",
            border: "none",
          },
        }}
      >
        <StoryInProgress closemodal={closemodal} />
      </Modal>
    </div>
  );
}
