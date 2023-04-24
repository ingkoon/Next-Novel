import React from "react";
import Guide from "./Guide";
import style from "./Bottom.module.css";

export default function Bottom({ name, button, isShaking }) {
  return (
    <div className={style.bottom}>
      <div className={style.guide}>
        <Guide isShaking={isShaking} />
      </div>
      <div className={style.middle}>
        <img src={process.env.PUBLIC_URL + `/img/path.png`} alt="path" />
        <button className={style.button} onClick={button}>
          {name}
        </button>
      </div>
    </div>
  );
}
