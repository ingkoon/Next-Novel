import React, { useEffect, useRef, useState } from "react";
import style from "./Canvas.module.css";

export default function Canvas2({ setImageSrcs }) {
  // useRef
  const canvasRef = useRef(null);
  // getCtx
  const [getCtx, setGetCtx] = useState(null);
  // painting state
  const [painting, setPainting] = useState(false);

  const [mouseX, setmouseX] = useState();
  const [mouseY, setmouseY] = useState();

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
      setImageSrcs(dataURL);
    }
  };

  return (
    <div className={style.container}>
      <canvas
        className={style.canvas}
        ref={canvasRef}
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => setPainting(false)}
        onMouseMove={(e) => drawFn(e)}
        onMouseLeave={() => setPainting(false)}
      ></canvas>
    </div>
  );
}
