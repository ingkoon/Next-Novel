import React from "react";
import TitleBar from '../components/TitleBar'
import Booklist from '../components/Booklist'
import Genre from "../components/Genre";
import GoTop from "../components/GoToTop";
import NewBookList from "../components/NewBookList"

export default function Novels() {
  return (
    <>
      <TitleBar/>
      <NewBookList/>
      <Genre/>
      <Booklist/>
      <GoTop/>
    </>
  );
}
