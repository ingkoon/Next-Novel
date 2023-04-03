import React, { useState } from "react";
import Guide from "./Guide";
import style from "./WriteStep5b.module.css";
import { useNovelContext } from "../../context/NovelContext";
import LoadingModal from "../common/LoadingModal";
import useNovelWrite from "../../hooks/useNovelWrite";
import { useNavigate } from "react-router-dom";

export default function WriteStep5b({ step }) {
  const { novel } = useNovelContext();
  const [input, setInput] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const { finNovel } = useNovelWrite();
  const navigate = useNavigate();

  const buttons = [
    {
      icon: "",
      click1: "제목",
    },
    {
      icon: "/icon/message.svg",
      click1: "한줄 소개글",
    },
    {
      icon: "/icon/tag.svg",
      click1: "장르",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const button = () => {
    if (!input.title || !input.desc) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800); // 0.8초 후 클래스 제거
      return;
    }
    const formData = new FormData();
    formData.append("novel_id", novel.id);
    formData.append("title", input.title);
    formData.append("introduction", input.desc);
    finNovel.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        navigate(`/library/${novel.id}/intro`, { state: { id: novel.id } });
      },
    });
  };

  return (
    <div className={style.container}>
      <LoadingModal state={finNovel.isLoading} />
      <div className={style.left}>
        <div className={style.cover}>
          <img
            src={process.env.REACT_APP_IMAGE_API + novel.cover}
            alt="cover"
          />
        </div>
        <div className={style.back1} />
        <div className={style.back2} />
        <div className={style.back3} />
        <div className={style.back4} />
      </div>
      <div className={style.right}>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={style.circle_left}
          alt="circle_left"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={style.circle_right}
          alt="circle_right"
        />
        <div className={style.input}>
          {buttons.map((button, index) => {
            return (
              <div className={style.component}>
                <div className={style.element1} />
                <div className={style.element2} />
                <div className={style.element3} />
                <div className={style.content1}>
                  <div className={style.icon}>
                    {index !== 0 && (
                      <img
                        src={process.env.PUBLIC_URL + button.icon}
                        alt="icon"
                      />
                    )}
                    {index === 0 && <div>Tt</div>}
                  </div>
                  <div className={style.click1}>{button.click1}</div>
                </div>
                <div className={style.content2}>
                  <div className={style.click2} />
                  <div className={style.click3}>
                    {index === 0 && (
                      <input
                        type="text"
                        name="title"
                        value={input.title ?? ""}
                        placeholder="제목"
                        required
                        onChange={handleChange}
                      />
                    )}
                    {index === 1 && (
                      <input
                        type="text"
                        name="desc"
                        value={input.desc ?? ""}
                        placeholder="한줄 소개글"
                        required
                        onChange={handleChange}
                      />
                    )}
                    {index === 2 && <span>{novel.genre}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.guide}>
          <Guide step={step} isShaking={isShaking} />
        </div>
        <div className={style.end}>
          <div>
            <div className={style.slide} />
            <div className={style.end1}>
              <img src={process.env.PUBLIC_URL + `/img/path.png`} alt="path" />
            </div>
            <div className={style.fin} onClick={button}>
              <div className={style.end2} />
              <div className={style.end3}>Fin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
