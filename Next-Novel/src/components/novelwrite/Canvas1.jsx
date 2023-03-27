import React, { useEffect, useRef, useState } from "react";
import style from "./Canvas1.module.css";

export default function Canvas1({ imageSrcs, setImageSrcs, selected }) {
  // useRef
  const canvasRef = useRef(null);
  // getCtx
  const [getCtx, setGetCtx] = useState(null);
  // painting state
  const [painting, setPainting] = useState(false);

  const [mouseX, setmouseX] = useState();
  const [mouseY, setmouseY] = useState();

  const [widthState, setWidthState] = useState(5);
  const [colorState, setColorState] = useState("#000000");
  const [openSetWidthState, setOpenSetWidthState] = useState(false);
  const [openSetColorState, setOpenSetColorState] = useState(false);
  const [store, setStore] = useState([]); //뒤로가기용
  const [paintState, setPaintState] = useState(false);

  const colors = [
    "#e53730",
    "#d81758",
    "#8a23a4",
    "#5a34ad",
    "#3c49ab",
    "#3e8cef",
    "#3fa0f1",
    "#44b4cd",
    "#328b7d",
    "#55a549",
    "#87bb44",
    "#c7d737",
    "#fce739",
    "#f7b816",
    "#f48c10",
    "#f14b20",
    "#6a4b3f",
    "#597280",
    "#c1c1c1",
    "#6f6f6f",
    "#000000",
  ];

  useEffect(() => {
    // canvas useRef
    const canvas = canvasRef.current;
    canvas.width = 608;
    canvas.height = 380;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#000000";
    setGetCtx(ctx);
  }, []);

  useEffect(() => {
    if (getCtx) getCtx.clearRect(0, 0, 608, 380);

    const img = new Image();
    img.src = imageSrcs[selected];
    img.onload = () => getCtx.drawImage(img, 0, 0);

    setStore([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (!painting && paintState) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      setImageSrcs(
        imageSrcs.map((imageSrc, index) =>
          index === selected ? dataURL : imageSrc
        )
      );
      setStore([...store, dataURL]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [painting]);

  useEffect(() => {
    if (imageSrcs[selected] !== store[store.length - 1]) {
      const dataURL = store[store.length - 1];

      getCtx.clearRect(0, 0, 608, 380);

      const img = new Image();
      img.src = dataURL;
      img.onload = () => getCtx.drawImage(img, 0, 0);

      setImageSrcs(
        imageSrcs.map((imageSrc, index) =>
          index === selected ? dataURL : imageSrc
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  const drawFn = (e) => {
    // mouse position
    setmouseX(e.nativeEvent.offsetX);
    setmouseY(e.nativeEvent.offsetY);
    // console.log(mouseX, mouseY);
    // drawing
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else {
      getCtx.lineTo(mouseX, mouseY);
      getCtx.stroke();
      setPaintState(true);
    }
  };
  const onPencil = () => {
    getCtx.strokeStyle = colorState;
  };
  const onEraser = () => {
    getCtx.strokeStyle = "white";
  };
  const openSetWidth = () => {
    setOpenSetWidthState((prev) => !prev);
  };
  const setWidth = (event) => {
    setWidthState(event.target.value);
    getCtx.lineWidth = event.target.value;
  };
  const openSetColor = () => {
    setOpenSetColorState((prev) => !prev);
  };
  const setColor = (event) => {
    setColorState(event.target.dataset.color);
    getCtx.strokeStyle = event.target.dataset.color;
  };
  const goBack = () => {
    setStore([...store.slice(0, store.length - 1)]);
  };
  const initCanvas = () => {
    getCtx.clearRect(0, 0, 608, 380);
    setImageSrcs(
      imageSrcs.map((imageSrc, index) =>
        index === selected ? undefined : imageSrc
      )
    );
    setStore([]);
  };

  return (
    <div className={style.container}>
      <div className={style.canvas}>
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
        ></canvas>
      </div>
      <div className={style.tools}>
        <div className={style.tool1}>
          <img
            src={process.env.PUBLIC_URL + `/icon/pen.svg`}
            alt="pen"
            onClick={onPencil}
          />
        </div>
        <div className={style.tool2}>
          <img
            src={process.env.PUBLIC_URL + `/icon/eraser.svg`}
            alt="eraser"
            onClick={onEraser}
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
          ></div>
          {openSetColorState && (
            <div className={style.setColor}>
              {colors.map((color) => (
                <div
                  class="color-option"
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
                ></div>
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
            ></div>
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
    </div>
  );
}
