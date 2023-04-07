import React from "react";
import TitleBar from '../components/common/TitleBar'
import Footer from '../components/common/Footer'

import GoTop from "../components/common/GoToTop";
import Search from "../components/search/Search"

export default function NovelSearch() {
  return (
    <>
      <TitleBar name='검색' intro='찾는 소설이 있으신가요?' subintro1='search' subintro2='ken-saku' img='search'/>
      <Search/>
      <GoTop/>
      <Footer />
    </>
  );
}