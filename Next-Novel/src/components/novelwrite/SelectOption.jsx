import React, { useEffect, useState } from "react";
import style from "./SelectOption.module.css";
import { useNovelContext } from "../../context/NovelContext";
import { useQuery } from "@tanstack/react-query";
import { fetchQuestions } from "../../api/novelwrite";
import Modal from "react-modal";

export default function SelectOption({ setStep, count, setCount }) {
  const { novel, setNovel } = useNovelContext();

  //hooks 폴더에 분리하고 싶었는데....
  const { isFetching, refetch, data } = useQuery(
    ["questions"],
    () => fetchQuestions(novel.id, novel.step + 1),
    {
      enabled: false,
      select: (data) => data.data,
    }
  );
  useEffect(() => {
    if (data) {
      setNovel({ ...novel, questions: data.queries });
      setStep(4); //다음 페이지
      setCount(count + 1); //이어하기 횟수
    }
  }, [data]);

  const buttons = [
    {
      icon: "/icon/check.svg",
      click1: "완료하기",
      click3: "이대로 소설을\n마무리합니다",
      event: () => setStep(5),
    },
    {
      icon: "",
      click1: "이어하기",
      click3: "이야기를\n더 진행합니다",
      event: () => {
        if (count === 5) return;
        setNovel((novel) => ({ ...novel, step: novel.step + 1 })); //보낼 novel 값 업데이트
        refetch();
      },
    },
    {
      icon: "/icon/trashcan.svg",
      click1: "처음부터",
      click3: "모든 진행사항을\n초기화합니다",
      event: () => setStep(0),
    },
  ];
  return (
    <div className={style.container}>
      <Modal
        isOpen={isFetching}
        style={{
          overlay: {},
          content: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            inset: "0",
            background: "none",
          },
        }}
      >
        <img src={process.env.PUBLIC_URL + `/img/loading.gif`} alt="loading" />
      </Modal>
      {buttons.map((button, index) => {
        return (
          <div
            className={`${style.component} ${
              count === 5 && index === 1 ? style.disabled : ""
            }`}
            key={index}
          >
            <div className={style.element1} />
            <div className={style.element2} />
            <div className={style.element3} />
            <div className={style.content}>
              <div className={style.icon}>
                {index !== 1 && (
                  <img src={process.env.PUBLIC_URL + button.icon} alt="icon" />
                )}
                {index === 1 && (
                  <>
                    <div className={style.count1}>{count}</div>
                    <div className={style.count2}>/5</div>
                  </>
                )}
              </div>
              <div className={style.click} onClick={button.event}>
                <div className={style.click1}>{button.click1}</div>
                <div className={style.click2} />
                <div className={style.click3}>{button.click3}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
