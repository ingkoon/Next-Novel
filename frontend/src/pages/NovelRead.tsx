import React from "react";
import { useState, useEffect } from "react";
import Book from "../components/novelread/Book";
import BookMobile from "../components/novelread/BookMobile";
import InfoCard from "../components/novelread/InfoCard";
import InfoCardMobile from "../components/novelread/InfoCardMobile";
import style from "../components/novelread/NovelRead.module.css";

export default function NovelRead() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // adjust this value to your needs
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isMobile && (
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={style.cleft}
          alt="circles_left"
        />
      )}
      {isMobile ? <InfoCardMobile /> : <InfoCard />}
      {isMobile ? <BookMobile /> : <Book />}
      {!isMobile && (
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={style.cright}
          alt="circles_right"
        />
      )}
    </>
  );
}
