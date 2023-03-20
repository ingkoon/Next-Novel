import React from "react";
import style from "./GenreCard.module.css";

export default function GenreCard({ genreInfo, genre, setGenre }) {
  const { name, desc, value } = genreInfo;
  return (
    <div
      onClick={() => setGenre(value)}
      className={genre === value ? style.selected : ""}
    >
      <h1>{name}</h1>
      <h1>{desc}</h1>
    </div>
  );
}
