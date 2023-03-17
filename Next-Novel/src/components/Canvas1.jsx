import React, { useEffect, useRef, useState } from "react";
import "./Canvas.css";

export default function Canvas1({ imageSrcs, setImageSrcs, selected }) {
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
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#000000";

    const img = new Image();
    img.src = imageSrcs[selected];
    img.onload = () => ctx.drawImage(img, 0, 0);

    setGetCtx(ctx);
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
    }
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    setImageSrcs(
      imageSrcs.map((imageSrc, index) =>
        index === selected ? dataURL : imageSrc
      )
    );
  };

  return (
    <div className="view">
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={() => setPainting(true)}
        onMouseUp={() => setPainting(false)}
        onMouseMove={(e) => drawFn(e)}
        onMouseLeave={() => setPainting(false)}
      ></canvas>
    </div>
  );
}
