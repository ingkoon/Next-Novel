import style from "./Booklist.module.css";
import Card from "../common/Card";

//api
import { useEffect, useState } from "react";

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

type BookListProps = {
  novels: Book[];
  props: string;
  getsearchlist: (keyword: string) => void;
};

export default function Booklist({ novels, props, getsearchlist }: BookListProps) {

  const refreshList = () => {
    getsearchlist(props);
  }

  return (
    <div>
      <hr className={style.line} />
      <div className={style.list}>
        {novels?.map((book, index) => (
          <Card key={index} props={book} refreshList={refreshList}/>
        ))}
      </div>
    </div>
  );
}
