import style from "./AppBar.module.css";
import "./AppBar.css";
import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Login from "../login/Login";
import { v4 as uuid } from "uuid";
import { useLocation, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AppBar() {
  const navigate = useNavigate();
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const closemodal = () => {
    setLoginIsOpen(false);
  };

  const { user } = useContext(AuthContext);

  return (
    <div className={style.Appbar}>
      <div className={style.name}>
        <span style={{ float: "left" }}>&gt;_NextNovel &#183; &nbsp;</span>
        {/* <span>{user.access_token === "" ? 'visitor' : 'member'}</span> */}
        <span>{!localStorage.getItem('access_token') ? 'visitor' : 'member'}</span>
      </div>
      <div className={style.logo}>
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/icon/logo.svg"} alt="logo" />
        </Link>
      </div>
      <div className={style.menudiv}>
        <Link to="/library">
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/library.svg"}
            className={style.banner_book}
            alt="library"
          />
          <div className={style.arrow_box}>도서관</div>
        </Link>
        <Link to="/library/search">
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/search.svg"}
            className={style.banner_search}
            alt="search"
          />
          <div className={style.arrow_box}>검색</div>
        </Link>

        <Link
          to="/laboratory"
          onClick={(e) => {
            e.preventDefault();
            navigate("/laboratory", { state: uuid() });
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/pen.svg"}
            className={style.banner_pen}
            alt="pen"
          />
          <div className={style.arrow_box}>소설생성</div>
        </Link>

        {/* {user.access_token === '' */}
        {!localStorage.getItem("access_token")
          ? <div className={style.loginimg} onClick={() => setLoginIsOpen(true)}>
              <img
                src={process.env.PUBLIC_URL + "/icon/banner/idcard.svg"}
                className={style.banner_login}
                alt="idcard"
              />
              <div className={style.arrow_box}>로그인</div>
            </div> 
          : <Link to="/mypage">
              <img src={process.env.PUBLIC_URL + "/icon/banner/idcard.svg"} className={style.banner_mypage} alt='idcard'></img>
              <div className={style.arrow_box}>내정보</div>
            </Link>
          }
   
      </div>

      <Modal
        closeTimeoutMS={200}
        isOpen={loginIsOpen}
        onRequestClose={() => setLoginIsOpen(false)}
        style={{
          overlay: {
            zIndex: "100",
          },
          content: {
            width: "400px",
            height: "500px",
            margin: "auto",
            padding: "0",
            borderRadius: "20px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Login closemodal={closemodal} />
      </Modal>
    </div>
  );
}
