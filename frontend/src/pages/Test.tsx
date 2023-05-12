import React, { useRef, useEffect } from "react";

type TouchPoint = {
  x: number;
  y: number;
};

type CanvasProps = {
  width: number;
  height: number;
};

const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const previousPointRef = useRef<TouchPoint | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const touchX = touch.pageX - canvas.offsetLeft;
      const touchY = touch.pageY - canvas.offsetTop;

      console.log("1: ", touch.pageX, touch.pageY);
      console.log("2: ", canvas.offsetLeft, canvas.offsetTop);
      console.log("3: ", touchX, touchY);

      isDrawingRef.current = true;
      previousPointRef.current = { x: touchX, y: touchY };
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();

      if (!isDrawingRef.current) return;

      const touch = event.touches[0];
      const touchX = touch.pageX - canvas.offsetLeft;
      const touchY = touch.pageY - canvas.offsetTop;

      if (previousPointRef.current) {
        context.beginPath();
        context.moveTo(previousPointRef.current.x, previousPointRef.current.y);
        context.lineTo(touchX, touchY);
        context.stroke();
        previousPointRef.current = { x: touchX, y: touchY };
      }
    };

    const handleTouchEnd = () => {
      isDrawingRef.current = false;
      previousPointRef.current = null;
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div style={{ margin: "500px" }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid black" }}
      />
    </div>
  );
};

export default Canvas;
