import style from "./AppBar.module.css";
import "./AppBar.css";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Login from "../login/Login";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthContext";
import LoginModal from "./LoginModal";

export default function AppBar() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <div className={style.container}>
      <LoginModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <div className={style.status}>
        <div className={style.full}>
          <span>&gt;_NextNovel &#183; &nbsp;</span>
          <span>
            {localStorage.getItem("access_token") ? "member" : "visitor"}
          </span>
        </div>
        <div className={style.short}>
          <span>&gt;_N &#183; N</span>
        </div>
      </div>
      <div className={style.logo}>
        <Link to="/" onClick={() => setToggle(false)}>
          <img src={process.env.PUBLIC_URL + "/icon/logo.svg"} alt="logo" />
        </Link>
      </div>
      <div className={`${style.menu} ${toggle ? style.on : style.off}`}>
        <Link to="/library" onClick={() => setToggle(false)}>
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/library.svg"}
            className={style.menuIcon}
            alt="menu-icon"
          />
          <div className={style.arrowBox}>도서관</div>
        </Link>
        <Link to="/library/search" onClick={() => setToggle(false)}>
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
            setToggle(false);
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
          <div
            className={style.loginimg}
            onClick={() => {
              setModalIsOpen(true);
              setToggle(false);
            }}
          >
            <img
              src={process.env.PUBLIC_URL + "/icon/banner/login.svg"}
              className={style.menuIcon}
              alt="menu-icon"
            />
            <div className={style.arrowBox}>로그인</div>
          </div>
        ) : (
          <Link to="/mypage" onClick={() => setToggle(false)}>
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
        <img
          src={process.env.PUBLIC_URL + "/icon/banner/hamburger.svg"}
          className={style.menuIcon}
          alt="menu-icon"
        />
      </div>
    </div>
  );
}
