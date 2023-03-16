import React from "react";
import TitleBar from '../components/TitleBar'
import Booklist from '../components/Booklist'
import Genre from "../components/Genre";
import GoTop from "../components/GoToTop";

export default function Novels() {

  return (
    <>
      <TitleBar/>
      <Genre/>
      <Booklist/>
      <GoTop/>
    </>
  );
}
