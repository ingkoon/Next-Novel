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
    if (!cover) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800); // 0.8초 후 클래스 제거
      return;
    }
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
    setCover(sample);
  };
  const [cover, setCover] = useState(undefined);
  const sample =
    "https://images.unsplash.com/photo-1679882428282-78da16ccecf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
  const [isShaking, setIsShaking] = useState(false);

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
                {cover && (
                  <img src={sample} className={style.cover} alt="cover" />
                )}
                {!cover && (
                  <img
                    src={process.env.PUBLIC_URL + "/icon/cover_wait.svg"}
                    className={style.cover_wait}
                    alt="cover_wait"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom step={step} name="제출" button={button} isShaking={isShaking} />
    </div>
  );
}
