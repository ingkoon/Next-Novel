import React from "react";
import style from "./CurrentStepIcon.module.css";

export default function CurrentStepIcon({ step }) {
  const flooredStep = Math.floor(step);
  const logoSrc = process.env.PUBLIC_URL + "/icon/logo.svg";
  const logoWhiteSrc = process.env.PUBLIC_URL + "/icon/logo_white.svg";
  const blackOrWhite = [];

  for (let i = 1; i <= 5; i++) {
    if (flooredStep >= i) {
      blackOrWhite.push("black");
    } else {
      blackOrWhite.push("white");
    }
  }

  return (
    <div className={style.container}>
      {blackOrWhite.map((what, index) => (
        <div
          className={`${style.component} ${
            what === "black" ? style.black : style.white
          }`}
          key={index}
        >
          <span>{index + 1}</span>
          <img src={what === "black" ? logoSrc : logoWhiteSrc} alt="logo" />
        </div>
      ))}
    </div>
  );
}
