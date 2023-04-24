import React, { useEffect, useRef, useState } from "react";
import style from "./Canvas.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";
import useCanvasIsPainting from "../../hooks/useCanvasIsPainting";
import useCanvasSaveAndLoad from "../../hooks/useCanvasSaveAndLoad";
import Tools from "./Tools";
import LoadPaintings from "./LoadPaintings";

export default function Canvas({
  imageSrcs,
  setImageSrcs,
  selected,
  canvasType,
}) {
  const canvasRef = useRef(null); //canvas
  const [getCtx, setGetCtx] = useState(null); //canvas
  const [rect, setRect] = useState(); //터치용
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const {
    getPaintings: { refetch, data },
  } = useNovelWrite();

  const {
    drawFn,
    touchStart,
    touch,
    touchEnd,
    painting,
    hasPaintBefore,
    setPainting,
  } = useCanvasIsPainting([getCtx, rect]);

  const { loadToCanvas, goBack, initCanvas } = useCanvasSaveAndLoad([
    getCtx,
    canvasWidth,
    canvasHeight,
    imageSrcs,
    setImageSrcs,
    selected,
    painting,
    hasPaintBefore,
    data,
    canvasRef,
  ]);

  useEffect(() => {
    setCanvasWidth(canvasRef.current.clientWidth);
  }, [canvasRef]);
  useEffect(() => {
    setCanvasHeight(canvasRef.current.clientHeight);
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = canvasWidth;
    // canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    setRect(canvas.getBoundingClientRect());
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    setGetCtx(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //맨 처음 컴포넌트 설정

  return (
    <div className={style.container}>
      <canvas
        className={`${style.canvas} ${style[canvasType]}`}
        ref={canvasRef}
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => {
          setPainting(false);
        }}
        onMouseMove={(e) => drawFn(e)}
        onMouseLeave={() => {
          setPainting(false);
        }}
        onTouchStart={(e) => {
          touchStart(e);
        }}
        onTouchMove={(e) => {
          touch(e);
        }}
        onTouchEnd={(e) => {
          touchEnd(e);
        }}
      />
      <Tools getCtx={getCtx} goBack={goBack} initCanvas={initCanvas} />
      {canvasType === "big" && (
        <LoadPaintings
          loadToCanvas={loadToCanvas}
          refetch={refetch}
          data={data}
        />
      )}
    </div>
  );
}
