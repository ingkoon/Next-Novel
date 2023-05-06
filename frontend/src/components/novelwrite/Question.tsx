import React, { useEffect, useState } from "react";
import style from "./Question.module.css";
import { useNovelContext } from "../../context/NovelContext";
import StoryInProgressModal from "../common/StoryInProgressModal";

export default function Question() {
  const { novel, setNovel, count } = useNovelContext();
  const [selected, setSelected] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSelected = () => {
    setSelected((selected + 1) % 3);
  };
  useEffect(() => {
    setNovel({ ...novel, selectedQuestion: novel.questions[selected] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.Q}>Q.</div>
        <div className={style.count1}>{count}</div>
        <div className={style.count2}>/5</div>
        <div className={style.question}>{novel.questions[selected]}</div>
        <div className={style.dice}>
          <img
            src={process.env.PUBLIC_URL + `/icon/dice.svg`}
            alt="dice"
            onClick={handleSelected}
          />
        </div>
      </div>
      <div className={style.button}>
        <button onClick={() => setModalIsOpen(true)}>
          지금까지의 스토리 보기
        </button>
      </div>
      <StoryInProgressModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
}
