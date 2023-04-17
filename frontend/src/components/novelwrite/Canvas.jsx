import React, { useEffect, useRef, useState } from "react";
import style from "./Canvas.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";
import useCanvasPaintingTool from "../../hooks/useCanvasPaintingTool";
import useCanvasIsPainting from "../../hooks/useCanvasIsPainting";
import useCanvasSaveAndLoad from "../../hooks/useCanvasSaveAndLoad";

export default function Canvas({
  imageSrcs,
  setImageSrcs,
  selected,
  canvasWidth,
  canvasHeight,
  canvasType,
}) {
  const canvasRef = useRef(null); //canvas
  const [getCtx, setGetCtx] = useState(null); //canvas
  const [rect, setRect] = useState(); //터치용
  const [loadState, setLoadState] = useState(false); //그림 불러오기 창

  const {
    getPaintings: { refetch, data },
  } = useNovelWrite();

  const {
    onPencil,
    onEraser,
    openSetWidth,
    setWidth,
    openSetColor,
    setColor,
    colors,
    widthState,
    colorState,
    penSelected,
    eraserSelected,
    setPenSelected,
    setEraserSelected,
    openSetWidthState,
    openSetColorState,
  } = useCanvasPaintingTool([getCtx]);

  const {
    drawFn,
    touchStart,
    touch,
    touchEnd,
    painting,
    hasPaintBefore,
    setPainting,
  } = useCanvasIsPainting([getCtx, widthState, rect]);

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
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    setRect(canvas.getBoundingClientRect());
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = widthState;
    ctx.strokeStyle = colorState;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    setGetCtx(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //맨 처음 컴포넌트 설정

  return (
    <div className={style.container}>
      <div className={`${style.canvas} ${style[canvasType]}`}>
        <canvas
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
      <div className={style.tools}>
        <div className={`${style.tool1} ${penSelected ? style.selected : ""}`}>
          <img
            src={process.env.PUBLIC_URL + `/icon/pen.svg`}
            alt="pen"
            onClick={() => {
              onPencil();
              setPenSelected(true);
              setEraserSelected(false);
            }}
          />
        </div>
        <div
          className={`${style.tool2} ${eraserSelected ? style.selected : ""}`}
        >
          <img
            src={process.env.PUBLIC_URL + `/icon/eraser.svg`}
            alt="eraser"
            onClick={() => {
              onEraser();
              setPenSelected(false);
              setEraserSelected(true);
            }}
          />
        </div>
        <div className={style.tool3}>
          <div
            style={{
              width: "50px",
              height: "30px",
              backgroundColor: `${colorState}`,
              border: "3px solid black",
            }}
            onClick={openSetColor}
          />
          {openSetColorState && (
            <div className={style.setColor}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    margin: "5px",
                  }}
                  data-color={color}
                  onClick={(event) => {
                    setColor(event);
                    openSetColor();
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className={style.tool4}>
          <div
            style={{
              width: "50px",
              height: "30px",
              backgroundColor: "white",
              border: "3px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={openSetWidth}
          >
            <div
              style={{
                width: `${widthState}px`,
                height: `${widthState}px`,
                backgroundColor: "black",
                borderRadius: "50%",
              }}
            />
          </div>
          {openSetWidthState && (
            <div className={style.setWidth}>
              <input
                type="range"
                min="1"
                max="20"
                defaultValue={widthState}
                step="0.1"
                onMouseUp={(event) => {
                  setWidth(event);
                  openSetWidth();
                }}
              />
            </div>
          )}
        </div>
        <div className={style.tool5}>
          <img
            src={process.env.PUBLIC_URL + `/icon/back.svg`}
            alt="back"
            onClick={goBack}
          />
        </div>
        <div className={style.tool6}>
          <img
            src={process.env.PUBLIC_URL + `/icon/clear.svg`}
            alt="clear"
            onClick={initCanvas}
          />
        </div>
      </div>
      {canvasType === "big" && (
        <>
          <div
            className={style.openLoadButton}
            onClick={() => {
              setLoadState((prev) => !prev);
              refetch();
            }}
          >
            <img
              src={process.env.PUBLIC_URL + `/icon/history.svg`}
              alt="history"
            />
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
      )}
    </div>
  );
}
