import React from "react";
import TitleBar from '../components/TitleBar'
import Booklist from '../components/Booklist'
import GoTop from "../components/GoToTop";
import Search from "../components/Search"

export default function NovelSearch() {
  return (
    <>
      <TitleBar name='검색' intro='찾는 소설이 있으신가요?' subintro1='search' subintro2='ken-saku' img='search'/>
      <Search/>
      <Booklist/>
      <GoTop/>
    </>
  );
}
