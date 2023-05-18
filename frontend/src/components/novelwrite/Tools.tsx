import React from "react";
import style from "./Tools.module.css";
import useCanvasPaintingTool from "../../hooks/useCanvasPaintingTool";

type ToolsProps = {
  getCtx: CanvasRenderingContext2D;
  goBack: () => void;
  initCanvas: () => void;
};
export default function Tools({ getCtx, goBack, initCanvas }: ToolsProps) {
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
  } = useCanvasPaintingTool({ getCtx });

  return (
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
      <div className={`${style.tool2} ${eraserSelected ? style.selected : ""}`}>
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
            maxWidth: "50px",
            maxHeight: "30px",
            width: "65%",
            height: "55%",
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
            maxWidth: "50px",
            maxHeight: "30px",
            width: "65%",
            height: "55%",
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
              onTouchEnd={(event) => {
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
  );
}
