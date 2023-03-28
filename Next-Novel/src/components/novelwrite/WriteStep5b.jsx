import React, { useState } from "react";
import Guide from "./Guide";
import style from "./WriteStep5b.module.css";

export default function WriteStep5b({ genre, step }) {
  const genreName = ["", "로맨스", "판타지", "추리", "SF", "자유"];
  const [novel, setNovel] = useState({});
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
    setNovel((novel) => ({ ...novel, [name]: value }));
  };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.cover}>
          <img
            src="https://images.unsplash.com/photo-1678553542991-6bdca4108416?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt="cover"
          ></img>
        </div>
        <div className={style.back1}></div>
        <div className={style.back2}></div>
        <div className={style.back3}></div>
        <div className={style.back4}></div>
      </div>
      <div className={style.right}>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={style.circle_left}
          alt="circle_left"
        ></img>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={style.circle_right}
          alt="circle_right"
        ></img>
        <div className={style.input}>
          {buttons.map((button, index) => {
            return (
              <div className={style.component}>
                <div className={style.element1}></div>
                <div className={style.element2}></div>
                <div className={style.element3}></div>
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
                  <div className={style.click2}></div>
                  <div className={style.click3}>
                    {index === 0 && (
                      <input
                        type="text"
                        name="title"
                        value={novel.title ?? ""}
                        placeholder="제목"
                        required
                        onChange={handleChange}
                      />
                    )}
                    {index === 1 && (
                      <input
                        type="text"
                        name="desc"
                        value={novel.desc ?? ""}
                        placeholder="한줄 소개글"
                        required
                        onChange={handleChange}
                      />
                    )}
                    {index === 2 && <span>{genreName[genre]}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.guide}>
          <Guide step={step} />
        </div>
        <div className={style.end}>
          <div>
            <div className={style.end1}>
              <img src={process.env.PUBLIC_URL + `/img/path.png`} alt="path" />
            </div>
            <div className={style.fin}>
              <div className={style.end2}></div>
              <div className={style.end3}>Fin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
