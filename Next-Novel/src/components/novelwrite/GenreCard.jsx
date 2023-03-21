import React from "react";
import style from "./GenreCard.module.css";

export default function GenreCard({ genreInfo, genre, setGenre }) {
  const { name, desc, value } = genreInfo;
  return (
    <div
      className={genre === value ? style.selected : ""}
      onClick={() => setGenre(value)}
    >
      <div className={style.image}>
        <img src="" alt="" />
      </div>
      <div className={style.name}>
        <span>{name}</span>
        <img src="" alt="" />
      </div>
      <div className={style.desc}>
        <span>{desc}</span>
      </div>
    </div>
  );
}
