import style from "./AppBar.module.css"
import "./AppBar.css"
import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import Modal from "react-modal"
import Login from "../login/Login"

import axios from 'axios';
import { useLocation, useEffect } from 'react'
import {AuthContext} from "../../context/AuthContext"

export default function AppBar() {
  const [loginIsOpen, setLoginIsOpen] = useState(false)
  const closemodal = () => {
    setLoginIsOpen(false)
  }

  const {user} = useContext(AuthContext)

  return (
    <div className={style.Appbar}>
      <div className={style.name}>
        <span style={{ float: "left" }}>&gt;_NextNovel &#183; &nbsp;</span>
        <span>{user.access_token == "" ? 'visitor' : 'member'}</span>
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
        </Link>
        <Link to="/library/search">
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/search.svg"}
            className={style.banner_search}
            alt="search"
          />
        </Link>
        <Link to="/laboratory">
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/pen.svg"}
            className={style.banner_pen}
            alt="pen"
          />
        </Link>
        {/* <Link to="/mypage">
          <img src={process.env.PUBLIC_URL + "/icon/banner/idcard.svg"} className={style.banner_mypage} alt='idcard'></img>
        </Link> */}
        <div onClick={() => setLoginIsOpen(true)}>
          <img
            src={process.env.PUBLIC_URL + "/icon/banner/idcard.svg"}
            className={style.banner_mypage}
            alt="idcard"
          />
        </div>
      </div>

      <Modal isOpen={loginIsOpen} onRequestClose={() => setLoginIsOpen(false)}>
        <Login closemodal={closemodal} />
      </Modal>
    </div>
  )
}
