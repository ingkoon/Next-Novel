import React from "react";
import Card from "../common/Card";
import style from "./BookList.module.css";

export default function BookList({ books }) {
  return (
    <div className={style.cardlist}>
      {books.map((book, index) => (
        <Card props={book} key={index} className={style.cardcompo} />
      ))}
    </div>
  );
}
