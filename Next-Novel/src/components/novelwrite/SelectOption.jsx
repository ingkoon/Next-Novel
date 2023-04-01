import React, { useEffect } from "react";
import style from "./SelectOption.module.css";
import { useNovelContext } from "../../context/NovelContext";
import useNovelWrite from "../../hooks/useNovelWrite";
import LoadingModal from "../common/LoadingModal";

export default function SelectOption({ setStep, count, setCount }) {
  const { novel, setNovel } = useNovelContext();
  const {
    getQuestions: { isFetching, refetch, data },
  } = useNovelWrite();
  const { endNovel } = useNovelWrite();

  useEffect(() => {
    if (data) {
      setNovel({ ...novel, questions: data.queries });
      setStep(4); //다음 페이지
      setCount(count + 1); //이어하기 횟수
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const buttons = [
    {
      icon: "/icon/check.svg",
      click1: "완료하기",
      click3: "이대로 소설을\n마무리합니다",
      event: () => {
        const formData = new FormData();
        formData.append("step", novel.step + 1);
        formData.append("novel_id", novel.id);
        endNovel.mutate(formData, {
          onSuccess: () => {
            setStep(5);
          },
        });
        setNovel((novel) => ({ ...novel, step: novel.step + 1 }));
      },
    },
    {
      icon: "",
      click1: "이어하기",
      click3: "이야기를\n더 진행합니다",
      event: () => {
        if (count === 5) return;
        //아래 두 코드는 비동기로 실행되기때문에 getQuestions이 실행될때 novel.step+1로 두었는데...
        setNovel((novel) => ({ ...novel, step: novel.step + 1 }));
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
      <LoadingModal state={isFetching} />
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
