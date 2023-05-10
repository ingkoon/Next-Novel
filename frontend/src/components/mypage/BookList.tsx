import React from "react";
import Card from "../common/Card";
import style from "./BookList.module.css";

type BookListProps = {
  books: Book[];
};
type Book = {
  id: number;
  title: string;
  introduction: string;
  nickName: string;
  coverImg: string;
  hitCount: number;
  commentCount: number;
  likeCount: number;
};
export default function BookList({ books }: BookListProps) {
  return (
    <div className={style.cardlist}>
      {books.map((book, index) => (
        <Card props={book} key={index} />
      ))}
    </div>
  );
}
