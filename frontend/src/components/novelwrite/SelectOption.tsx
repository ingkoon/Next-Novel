import React, { useEffect } from "react";
import style from "./SelectOption.module.css";
import { useNovelContext } from "../../context/NovelContext";
import useNovelWrite from "../../hooks/useNovelWrite";
import LoadingModal from "../common/LoadingModal";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

export default function SelectOption() {
  const { novel, setNovel, setStep, count, setCount } = useNovelContext();
  const { endNovel, getQuestions } = useNovelWrite();
  const navigate = useNavigate();

  const buttons = [
    {
      icon: "/icon/check.svg",
      click1: "완료하기",
      click3: "이대로 소설을\n마무리합니다",
      event: () => {
        const formData = new FormData();
        formData.append("memberId", localStorage.getItem("memberId")!);
        endNovel.mutate(formData, {
          onSuccess: (res) => {
            console.log(res);
            setNovel({
              ...novel,
              endStory: res.data.korean_answer,
            });
            setStep(5);
          },
        });
      },
    },
    {
      icon: "",
      click1: "이어하기",
      click3: "이야기를\n더 진행합니다",
      event: () => {
        if (count === 5) return;
        const formData = new FormData();
        formData.append("memberId", localStorage.getItem("memberId")!);
        getQuestions.mutate(formData, {
          onSuccess: (res) => {
            console.log(res);
            setNovel({ ...novel, questions: res.data.questions });
            setStep(4); //다음 페이지
            setCount(count + 1); //이어하기 횟수
          },
        });
      },
    },
    {
      icon: "/icon/trashcan.svg",
      click1: "처음부터",
      click3: "모든 진행사항을\n초기화합니다",
      event: () => navigate("/laboratory", { state: uuid() }),
    },
  ];
  return (
    <div className={style.container}>
      <LoadingModal state={getQuestions.isLoading} />
      <LoadingModal state={endNovel.isLoading} />
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
