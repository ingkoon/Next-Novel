import React from "react";
import Card from "../common/Card";
import style from "./BookList.module.css";

type BookListProps = {
  books: Book[];
};
type Book = {
  id: number;
  cover_img: string;
  introduction: string;
  novel_stats: { hit_count: number; like_count: number; comment_count: number };
  author: string;
  title: string;
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
