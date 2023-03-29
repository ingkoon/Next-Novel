import React from "react";
import Book from "../components/novelread/Book";
import InfoCard from "../components/novelread/InfoCard";
import style from "../components/novelread/NovelRead.module.css";

export default function NovelRead() {
  return (
    <>
      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.cleft} alt='circles_left'></img>
      <InfoCard />
      <Book />
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.cright} alt='circles_right'></img>
    </>
  );
}
