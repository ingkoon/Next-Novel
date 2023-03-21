import React from "react";
import TitleBar from '../components/common/TitleBar'
import Booklist from '../components/library/Booklist'
import Genre from "../components/library/Genre";
import GoTop from "../components/common/GoToTop";
import NewBookList from "../components/library/NewBookList"

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
