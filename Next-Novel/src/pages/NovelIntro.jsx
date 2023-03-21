import React from "react";
import Thumbnail from "../components/novelintro/Thumbnail";
import BookInfo from "../components/novelintro/BookInfo";

export default function NovelIntro() {
  return (
    <>
    {
    /* <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'}  alt='circles_left'></img> */}
      <Thumbnail />
      <BookInfo />
    </>
  );
}
