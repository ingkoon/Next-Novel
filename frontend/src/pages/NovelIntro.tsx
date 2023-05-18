import React from "react";
import GoToTop from "../components/common/GoToTop";
import Footer from "../components/common/Footer";
import style from "../components/novelintro/NovelIntro.module.css";
import IntroInfo from "../components/novelintro/IntroInfo";

export default function NovelIntro() {
  return (
    <div className={style.page}>
      <img
        src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
        className={style.cleft}
        alt="circles_left"
      />
      <IntroInfo />
      <GoToTop />
      <img
        src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
        className={style.cright}
        alt="circles_right"
      />
      <Footer />
    </div>
  );
}
