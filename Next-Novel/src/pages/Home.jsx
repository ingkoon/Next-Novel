import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home - 임시 링크</h1>
      <Link to="/">
        <h2>Home</h2>
      </Link>
      <Link to="/library">
        <h2>도서관</h2>
      </Link>
      <Link to="/library/search">
        <h2>검색페이지</h2>
      </Link>
      <Link to="/library/intro">
        <h2>책인트로</h2>
      </Link>
      <Link to="/library/read">
        <h2>책읽기</h2>
      </Link>
      <Link to="/mypage">
        <h2>마이페이지</h2>
      </Link>
      <Link to="/laboratory">
        <h2>책제작페이지</h2>
      </Link>
    </>
  );
}
