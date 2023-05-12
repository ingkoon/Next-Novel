import style from "./Booklist.module.css";
import Card from "../common/Card";

//api
import { useEffect, useState } from "react";

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

type BookListProps = {
  novels: Book[];
};

export default function Booklist({ novels }: BookListProps) {
  // const [novels, setNovels] = useState([]);
  // useEffect(() => {
  //   let tmp = [];
  //   for (let i = 0; i < novellen; i++) {
  //     tmp = [...tmp];
  //     tmp.push(Card);
  //   }
  //   setArr(tmp);
  // }, [novels]);

  return (
    <div>
      <hr className={style.line} />
      <div className={style.list}>
        {novels?.map((book, index) => (
          <Card key={index} props={book} />
        ))}
      </div>
    </div>
  );
}
