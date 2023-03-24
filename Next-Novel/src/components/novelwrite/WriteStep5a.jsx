import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas3 from "./Canvas3";
import style from "./WriteStep5a.module.css";

export default function WriteStep5a({ setStep, step }) {
  const [imageSrcs, setImageSrcs] = useState(undefined);

  const button = () => setStep(5.5);
  return (
    <div className={style.container}>
      <div className={style.component}>
        <div className={style.left}>
          <div className={style.input}>
            <div className={style.canvas}>
              <Canvas3 imageSrcs={imageSrcs} setImageSrcs={setImageSrcs} />
            </div>
          </div>
          <div className={style.space}></div>
        </div>
        <div className={style.middle}>2</div>
        <div className={style.right}>
          <div className={style.space}></div>
          <div className={style.result}>
            <div className={style.img}>
              <div className={style.frame}>
                {/* <img
                  src="https://images.unsplash.com/photo-1678553542991-6bdca4108416?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  className={style.cover}
                  alt="cover"
                ></img> */}
                <img
                  src={process.env.PUBLIC_URL + "/icon/cover_wait.svg"}
                  className={style.cover_wait}
                  alt="cover_wait"
                ></img>
              </div>
            </div>
            <div className={style.move}>
              <img
                src={process.env.PUBLIC_URL + "/icon/left_arrow.svg"}
                className={style.left_arrow}
                alt="left_arrow"
              ></img>
              <span>1/4</span>
              <img
                src={process.env.PUBLIC_URL + "/icon/right_arrow.svg"}
                className={style.right_arrow}
                alt="right_arrow"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <Bottom step={step} name="제출" button={button} />
    </div>
  );
}
