import React from "react";
import style from "./GenreCard.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function GenreCard({ genreInfo }) {
  const { novel, setNovel } = useNovelContext();
  const { name, engName, desc, value } = genreInfo;
  return (
    <div
      className={`${style.container} ${
        novel.genre === engName ? style.selected : ""
      }`}
      onClick={() => setNovel({ ...novel, genre: engName })}
    >
      <div className={style.image}>
        <img
          src={process.env.PUBLIC_URL + `/img/genre_img${value}.jpg`}
          alt="genre_img"
        />
      </div>
      <div className={style.name}>
        <span>&lt; {name} /&gt;</span>
        <img
          src={
            novel.genre === engName
              ? process.env.PUBLIC_URL + `/img/genre_icon_yellow${value}.svg`
              : process.env.PUBLIC_URL + `/img/genre_icon${value}.svg`
          }
          alt="genre_icon"
        />
      </div>
      <div className={style.desc}>
        {desc.map((item, index) => (
          <span key={index}>
            {item}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}
