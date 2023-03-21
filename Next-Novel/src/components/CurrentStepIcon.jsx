import React from "react";
import style from "./CurrentStepIcon.module.css";

export default function CurrentStepIcon({ step }) {
  const flooredStep = Math.floor(step);
  const logoSrc = process.env.PUBLIC_URL + "/icon/logo.svg";
  const logoWhiteSrc = process.env.PUBLIC_URL + "/icon/logo_white.svg";
  const srcs = [];

  for (let i = 1; i <= 5; i++) {
    if (flooredStep >= i) {
      srcs.push(logoSrc);
    } else {
      srcs.push(logoWhiteSrc);
    }
  }

  return (
    <div className={style.container}>
      {srcs.map((src, index) => (
        <div className={style.component}>
          <span>{index + 1}</span>
          <img src={src} alt="logo" />
        </div>
      ))}
    </div>
  );
}
