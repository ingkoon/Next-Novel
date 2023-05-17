import React from "react";
import Card from "../common/Card";
import style from "./BookList.module.css";

type BookListProps = {
  books: Book[];
  refreshList: () => void;
};
type Book = {
  novelId: number;
  title: string;
  introduction: string;
  nickName: string;
  memberId: number;
  coverImg: string;
  hitCount: number;
  commentCount: number;
  likeCount: number;
  score: number;
};
export default function BookList({ books, refreshList }: BookListProps) {
  return (
    <div className={style.cardlist}>
      {books.map((book, index) => (
        <Card props={book} key={index} refreshList={refreshList} />
      ))}
    </div>
  );
}
