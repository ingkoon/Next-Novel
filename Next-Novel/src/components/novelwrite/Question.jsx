import React, { useState } from "react";
import style from "./Question.module.css";
import Modal from "react-modal";
import StoryInProgress from "./StoryInProgress";
import { useNovelContext } from "../../context/NovelContext";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../../api/novelwrite";

export default function Question({ count }) {
  const { novel } = useNovelContext();
  //hooks 폴더에 분리하고 싶었는데....
  //useNovelWrite가 켜질 때마다 계속 불러와서 일단 여기서 바로 함.
  const { isLoading, data: questions } = useQuery(
    ["questions", novel.id, novel.step],
    () => fetchQuestions(novel.id, novel.step)
  );
  const [IsOpen, setIsOpen] = useState(false);

  const closemodal = () => {
    setIsOpen(false);
  };
  console.log(questions);

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.Q}>Q.</div>
        <div className={style.count1}>{count}</div>
        <div className={style.count2}>/5</div>
        <div className={style.question}>
          {isLoading && <p>Loading...</p>}
          {questions && questions.data.queries[0].query}
        </div>
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
