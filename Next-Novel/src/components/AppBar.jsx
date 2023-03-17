import "./AppBar.scoped.css";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <div className="Appbar">
      <div className="name">
        <span style={{ float: "left" }}>&gt;_NxtNvl &#183; </span>
        <span>visitor</span>
      </div>
      <div className="logo">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + "/icon/logo.svg"}></img>
        </Link>
      </div>
      <div className="menudiv">
        <Link to="/library">
          <img src={process.env.PUBLIC_URL + "/icon/banner/banner_library.svg"} className='banner_book'></img>
        </Link>
        <Link to="/library/search">
          <img src={process.env.PUBLIC_URL + "/icon/banner/search.svg"} className='banner_search'></img>
        </Link>
        <Link to="/laboratory">
          <img src={process.env.PUBLIC_URL + "/icon/banner/pen.svg"} className='banner_pen'></img>
        </Link>
        <Link to="/mypage">
          <img src={process.env.PUBLIC_URL + "/icon/banner/idcard.svg"} className='banner_mypage'></img>
        </Link>
      </div>
    </div>
  );
}
