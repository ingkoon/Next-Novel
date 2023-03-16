import React from "react";
import TitleBar from '../components/TitleBar'
import Booklist from '../components/Booklist'
import Genre from "../components/Genre";

export default function Novels() {

  return (
    <>
      <TitleBar/>
      <Genre/>
      <Booklist/>
    </>
  );
}
