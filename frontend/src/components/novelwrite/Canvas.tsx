import React, { useEffect, useRef, useState } from "react";
import style from "./Canvas.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";
import useCanvasIsPainting from "../../hooks/useCanvasIsPainting";
import useCanvasSaveAndLoad from "../../hooks/useCanvasSaveAndLoad";
import Tools from "./Tools";
import LoadPaintings from "./LoadPaintings";

type CanvasProps = {
  imageSrcs: (string | undefined)[];
  setImageSrcs: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
  selected: number;
  canvasType: string;
};
export default function Canvas({
  imageSrcs,
  setImageSrcs,
  selected,
  canvasType,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null); //canvas
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D>(); //canvas
  const canvasWidth = canvasType === "big" ? 600 : 340;
  const canvasHeight = canvasType === "big" ? 380 : 390;
  const canvasBoxRef = useRef<HTMLDivElement>(null);

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
  } = useCanvasIsPainting({
    canvas: canvasRef.current!,
    getCtx: getCtx!,
    canvasBox: canvasBoxRef.current!,
  });

  const { loadToCanvas, goBack, initCanvas } = useCanvasSaveAndLoad({
    getCtx: getCtx!,
    canvasWidth,
    canvasHeight,
    imageSrcs,
    setImageSrcs,
    selected,
    painting,
    hasPaintBefore,
    data,
    canvasRef,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
    <div className={`${style.container} ${style[canvasType]}`}>
      <div className={style.canvasContainer}>
        <div className={style.canvasBox} ref={canvasBoxRef}>
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
        </div>
        <div className={style.loadPaintingsBox}>
          {canvasType === "big" && (
            <LoadPaintings
              loadToCanvas={loadToCanvas}
              refetch={refetch}
              data={data}
            />
          )}
        </div>
      </div>
      {getCtx && (
        <Tools getCtx={getCtx} goBack={goBack} initCanvas={initCanvas} />
      )}
    </div>
  );
}
