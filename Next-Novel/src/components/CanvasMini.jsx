import React, { useEffect, useRef, useState } from "react";
import "./Canvas.css";

export default function CanvasMini({ mouseX, mouseY, painting }) {
  // useRef
  const canvasRef = useRef(null);
  // getCtx
  const [getCtx, setGetCtx] = useState(null);

  useEffect(() => {
    // canvas useRef
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#000000";
    setGetCtx(ctx);
  }, []);

  const drawFn = (e) => {
    // console.log(mouseX, mouseY);
    // drawing
    if (!painting) {
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else {
      getCtx.lineTo(mouseX, mouseY);
      getCtx.stroke();
    }
  };

  return (
    <div className="view">
      {mouseX} {mouseY} {painting.toString()}
      <canvas className="canvas" ref={canvasRef}></canvas>
    </div>
  );
}
