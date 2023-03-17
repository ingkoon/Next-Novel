import React from "react";
import TitleBar from '../components/TitleBar'
import Booklist from '../components/Booklist'
import Genre from "../components/Genre";
import GoTop from "../components/GoToTop";
import NewBookList from "../components/NewBookList"

export default function Novels() {
  return (
    <>
      <TitleBar name='도서관' intro='도서관에서는 정숙해주시기 바랍니다.' subintro1='li-brary' subintro2='to-sho-kan' img='library'/>
      <NewBookList/>
      <Genre/>
      <Booklist/>
      <GoTop/>
    </>
  );
}
