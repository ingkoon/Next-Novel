import style from "./Genre.module.css";
import { MouseEvent } from "react";

type genreProps = {
  selectgenre: (genre: string) => void;
};

export default function Genre({ selectgenre }: genreProps) {
  // 장르 버튼 클릭 이벤트

  const goTop = () => {
    window.scrollTo({ top: 250, behavior: "smooth" });
  };

  const click = (e: MouseEvent<HTMLButtonElement>) => {
    const btnlist = document.querySelectorAll("button");
    for (let i = 0; i < btnlist.length; i++) {
      (btnlist[i] as HTMLElement).setAttribute("class", " ");
    }
    (e.target as HTMLElement).setAttribute("class", style.clicked);
    goTop();
  };

  return (
    <div className={style.genre}>
      <div>| 장르 : </div>
      <button
        className={style.clicked}
        onClick={(e) => {
          click(e);
          selectgenre("all");
        }}
      >
        전체
      </button>
      <button
        onClick={(e) => {
          click(e);
          selectgenre("mystery");
        }}
        id="mystery"
      >
        추리
      </button>
      <button
        onClick={(e) => {
          click(e);
          selectgenre("fantasy");
        }}
      >
        판타지
      </button>
      <button
        onClick={(e) => {
          click(e);
          selectgenre("sf");
        }}
      >
        {" "}
        SF
      </button>
      <button
        onClick={(e) => {
          click(e);
          selectgenre("romance");
        }}
      >
        로맨스
      </button>
      <button
        onClick={(e) => {
          click(e);
          selectgenre("free");
        }}
      >
        자유
      </button>
    </div>
  );
}
