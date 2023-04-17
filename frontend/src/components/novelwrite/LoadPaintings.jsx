import React, { useState } from "react";
import style from "./LoadPaintings.module.css";

export default function LoadPaintings({ loadToCanvas, refetch, data }) {
  const [loadState, setLoadState] = useState(false); //그림 불러오기 창

  return (
    <>
      <div
        className={style.openLoadButton}
        onClick={() => {
          setLoadState((prev) => !prev);
          refetch();
        }}
      >
        <img src={process.env.PUBLIC_URL + `/icon/history.svg`} alt="history" />
      </div>
      {loadState && (
        <div className={style.load}>
          <div className={style.tap}>
            <span>그림 불러오기</span>
            <button onClick={() => setLoadState(false)}>X</button>
          </div>
          <div className={style.paintings}>
            <div className={style.scroll}>
              {data?.map((image, index) => (
                <img
                  src={image.image}
                  alt=""
                  key={index}
                  onClick={() => {
                    loadToCanvas(index);
                    setLoadState(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
