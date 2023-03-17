import React from "react";
import "./GenreCard.css";

export default function GenreCard({ genreInfo, genre, setGenre }) {
  const { name, desc, value } = genreInfo;
  return (
    <div
      onClick={() => setGenre(value)}
      className={genre === value ? "selected" : ""}
    >
      <h1>{name}</h1>
      <h1>{desc}</h1>
    </div>
  );
}
