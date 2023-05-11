import React from "react";
import style from "./GenreCard.module.css";
import { useNovelContext } from "../../context/NovelContext";

type GenreCardProps = {
  genreInfo: GenreInfoType;
};
type GenreInfoType = {
  name: string;
  engName: string;
  desc: string[];
  value: number;
};
export default function GenreCard({ genreInfo }: GenreCardProps) {
  const { novel, setNovel } = useNovelContext();
  const { name, engName, desc, value } = genreInfo;
  return (
    <div
      className={`${style.container} ${
        novel.genreIndex === value ? style.selected : ""
      }`}
      onClick={() =>
        setNovel({
          ...novel,
          genreIndex: value,
          korGenreName: name,
          engGenreName: engName,
        })
      }
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
            novel.genreIndex === value
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
