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
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <div className={style.container}>
      <div className={style.status}>
        <div className={style.full}>
          <span>&gt;_NextNovel &#183; &nbsp;</span>
          <span>{user.access_token === "" ? "visitor" : "member"}</span>
        </div>
        <div className={style.short}>
          <span>&gt;_N &#183; N</span>
        </div>
      </div>
      <div className={style.logo}>
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/icon/logo.svg"} alt="logo" />
        </Link>
      </div>
      <div className={`${style.menu} ${toggle ? style.on : style.off}`}>
        <Link to="/library">
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/library.svg"}
            className={style.menuIcon}
            alt="menu-icon"
          />
          <div className={style.arrowBox}>도서관</div>
        </Link>
        <Link to="/library/search">
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/search.svg"}
            className={style.menuIcon}
            alt="menu-icon"
          />
          <div className={style.arrowBox}>검색</div>
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
            className={style.menuIcon}
            alt="menu-icon"
          />
          <div className={style.arrowBox}>소설생성</div>
        </Link>
        {!localStorage.getItem("access_token") ? (
          <div className={style.loginimg} onClick={() => setLoginIsOpen(true)}>
            <img
              src={process.env.PUBLIC_URL + "/icon/banner/login.svg"}
              className={style.menuIcon}
              alt="menu-icon"
            />
            <div className={style.arrowBox}>로그인</div>
          </div>
        ) : (
          <Link to="/mypage">
            <img
              src={process.env.PUBLIC_URL + "/icon/banner/idcard.svg"}
              className={style.menuIcon}
              alt="menu-icon"
            />
            <div className={style.arrowBox}>내정보</div>
          </Link>
        )}
      </div>
      <div className={style.toggle} onClick={() => setToggle((prev) => !prev)}>
        토글
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
