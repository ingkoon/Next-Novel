import style from "./AppBar.module.css";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <div className={style.Appbar}>
      <div className={style.name}>
        <span style={{ float: "left" }}>&gt;_NxtNvl &#183; </span>
        <span>visitor</span>
      </div>
      <div className={style.logo}>
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/icon/logo.svg"} alt='logo'></img>
        </Link>
      </div>
      <div className={style.menudiv}>
        <Link to="/library">
          <img src={process.env.PUBLIC_URL + "/icon/banner/library.svg"} className={style.banner_book} alt='library'></img>
        </Link>
        <Link to="/library/search">
          <img src={process.env.PUBLIC_URL + "/icon/banner/search.svg"} className={style.banner_search} alt='search'></img>
        </Link>
        <Link to="/laboratory">
          <img src={process.env.PUBLIC_URL + "/icon/banner/pen.svg"} className={style.banner_pen} alt='pen'></img>
        </Link>
        <Link to="/mypage">
          <img src={process.env.PUBLIC_URL + "/icon/banner/idcard.svg"} className={style.banner_mypage} alt='idcard'></img>
        </Link>
      </div>
    </div>
  );
}
