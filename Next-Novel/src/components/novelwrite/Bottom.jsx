import React from "react";
import Guide from "./Guide";
import style from "./Bottom.module.css";

export default function Bottom({ step, name, count, button }) {
  return (
    <div className={style.bottom}>
      <Guide step={step} count={count} />
      <div className={style.middle}>
        <img src={process.env.PUBLIC_URL + `/img/path.png`} alt="path" />
        <button className={style.button} onClick={button}>
          {name}
        </button>
      </div>
    </div>
  );
}
