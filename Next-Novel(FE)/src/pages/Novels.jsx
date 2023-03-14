import React from "react";
import TitleBar from '../components/TitleBar'

export default function Novels() {

  let arr = []
  function booklist(){
    for(let i=0;i<10;i++){
      arr.push(TitleBar)
    }
  }

  return (
    <>
      <TitleBar/>
      {arr.map((Component, index) => {
        <Component key={index}/>
      })}
    </>
  );
}
