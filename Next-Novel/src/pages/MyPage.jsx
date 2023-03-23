import React from "react";
import TitleBar from '../components/common/TitleBar'
import IdCard from '../components/mypage/IdCard'
import MyNovel from '../components/mypage/MyNovel'

export default function MyPage() {
  return (
    <>
      <TitleBar name='계정' intro='아, 오셨군요.' subintro1='acc-ount' subintro2='aka-unto' img='idcard'/>
      <IdCard/>
      <MyNovel/>
    </>
  );
}
