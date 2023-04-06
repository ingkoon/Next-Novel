import React from "react";
import Thumbnail from "../components/novelintro/Thumbnail";
import BookInfo from "../components/novelintro/BookInfo";
import Comments from "../components/novelintro/Comments";
import GoToTop from "../components/common/GoToTop";
import Footer from '../components/common/Footer'
import style from "../components/novelintro/NovelIntro.module.css";

export default function NovelIntro() {
  return (
    <div className={style.page}>
      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.cleft} alt='circles_left'></img>
      <Thumbnail />
      <BookInfo />
      <Comments />
      <GoToTop />
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.cright} alt='circles_right'></img>
      <Footer />
    </div>
  )
}