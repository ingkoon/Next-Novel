import React, { useState } from "react";
import style from "./LoadPaintings.module.css";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";

type LoadPaintingsProps = {
  loadToCanvas: (index: number) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  data: DataType[];
};
type DataType = {
  imageName: string;
  caption: string;
};
export default function LoadPaintings({
  loadToCanvas,
  refetch,
  data,
}: LoadPaintingsProps) {
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
                src={process.env.REACT_APP_IMAGE_API + image.imageName}
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
