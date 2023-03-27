import React from "react";
import Book from "../components/novelread/Book";
import InfoCard from "../components/novelread/InfoCard";
import Finish from "../components/novelread/Finish";
import style from "../components/novelread/NovelRead.module.css";

export default function NovelRead() {
  return (
    <>
      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.cleft} alt='circles_left'></img>
      <InfoCard />
      <Book />
      <Finish />
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.cright} alt='circles_right'></img>
    </>
  );
}
