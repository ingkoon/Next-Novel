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

  const [colorState, setColorState] = useState("#000000");
  const [openSetWidthState, setOpenSetWidthState] = useState(false);
  const [openSetColorState, setOpenSetColorState] = useState(false);
  const [store, setStore] = useState([]);

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
    // warning이 뜨는데 일단 block처리함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

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

      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      setImageSrcs(
        imageSrcs.map((imageSrc, index) =>
          index === selected ? dataURL : imageSrc
        )
      );
      setStore(store.push(dataURL));
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
    getCtx.lineWidth = event.target.value;
  };
  const openSetColor = () => {
    setOpenSetColorState((prev) => !prev);
  };
  const setColor = (event) => {
    getCtx.strokeStyle = event.target.value;
    setColorState(event.target.value);
  };
  const goBack = () => {
    setStore(store.pop());
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
  };
  const initCanvas = () => {
    getCtx.clearRect(0, 0, 608, 380);
    setImageSrcs(
      imageSrcs.map((imageSrc, index) =>
        index === selected ? undefined : imageSrc
      )
    );
  };

  return (
    <div className={style.container}>
      <div className={style.canvas}>
        <canvas
          ref={canvasRef}
          onMouseDown={() => setPainting(true)}
          onMouseUp={() => setPainting(false)}
          onMouseMove={(e) => drawFn(e)}
          onMouseLeave={() => setPainting(false)}
        ></canvas>
      </div>
      <div className={style.tools}>
        <div className={style.tool1} onClick={onPencil}>
          연필
        </div>
        <div className={style.tool2} onClick={onEraser}>
          지우개
        </div>
        <div className={style.tool3} onClick={openSetWidth}>
          굵기
          {openSetWidthState && (
            <div className={style.setWidth}>
              <input
                type="range"
                min="1"
                max="20"
                defaultValue="5"
                step="0.1"
                onMouseUp={setWidth}
              />
            </div>
          )}
        </div>
        <div className={style.tool4} onClick={openSetColor}>
          색깔
          {openSetColorState && <div className={style.setColor}>ㅇㅇ</div>}
        </div>
        <div className={style.tool5} onClick={goBack}>
          뒤로가기
        </div>
        <div className={style.tool6} onClick={initCanvas}>
          휴지통
        </div>
      </div>
    </div>
  );
}
