import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas3 from "./Canvas3";
import style from "./WriteStep5a.module.css";

export default function WriteStep5a({ setStep, step }) {
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 1 }, () => undefined)
  );
  const selected = 0;
  const button = () => {
    //표지 유효성 검사 코드
    //표지 안만들면 return
    setStep(5.5);
  };
  const makeCover = () => {
    //그림 유효성 검사
    for (let imageSrc of imageSrcs) {
      if (!imageSrc) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 800); // 0.8초 후 클래스 제거
        return;
      }
    }
    //cover 만들기 코드
  };
  const result = [
    "https://images.unsplash.com/photo-1678553542991-6bdca4108416?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1679882428282-78da16ccecf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1679663956946-79bbb6bae250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1679623591379-2f11ce2937c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  ];
  const [resultSelected, setResultSelected] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const moveLeft = () => {
    if (resultSelected === 0) return;
    setResultSelected((prev) => prev - 1);
  };
  const moveRight = () => {
    if (resultSelected === 3) return;
    setResultSelected((prev) => prev + 1);
  };

  return (
    <div className={style.container}>
      <div className={style.component}>
        <div className={style.left}>
          <div className={style.input}>
            <div className={style.canvas}>
              <Canvas3
                imageSrcs={imageSrcs}
                setImageSrcs={setImageSrcs}
                selected={selected}
              />
            </div>
          </div>
          <div className={style.space} />
        </div>
        <div className={style.middle}>
          <button className={style.toggle} onClick={makeCover}>
            표지 생성
          </button>
        </div>
        <div className={style.right}>
          <div className={style.space} />
          <div className={style.result}>
            <div className={style.img}>
              <div className={style.frame}>
                <img
                  src={result[resultSelected]}
                  className={style.cover}
                  alt="cover"
                />
                {/* <img
                  src={process.env.PUBLIC_URL + "/icon/cover_wait.svg"}
                  className={style.cover_wait}
                  alt="cover_wait"
                ></img> */}
              </div>
            </div>
            <div className={style.move}>
              <img
                src={process.env.PUBLIC_URL + "/icon/left_arrow.svg"}
                className={style.left_arrow}
                alt="left_arrow"
                onClick={moveLeft}
              />
              <span>{resultSelected + 1}/4</span>
              <img
                src={process.env.PUBLIC_URL + "/icon/right_arrow.svg"}
                className={style.right_arrow}
                alt="right_arrow"
                onClick={moveRight}
              />
            </div>
          </div>
        </div>
      </div>
      <Bottom step={step} name="제출" button={button} isShaking={isShaking} />
    </div>
  );
}
