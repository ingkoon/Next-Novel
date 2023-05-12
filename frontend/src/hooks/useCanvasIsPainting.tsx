import { useEffect, useRef, useState } from "react";
type TouchPoint = {
  x: number;
  y: number;
};

type CanvasIsPaintingProps = {
  canvas: HTMLCanvasElement;
  getCtx: CanvasRenderingContext2D;
  canvasBox: HTMLDivElement;
};
export default function useCanvasIsPainting({
  canvas,
  getCtx,
  canvasBox,
}: CanvasIsPaintingProps) {
  const [painting, setPainting] = useState(false); //그림을 그리고 있는지 아닌지
  const [hasPaintBefore, setHasPaintBefore] = useState(false); //그림을 그렸던 적이 한번이라도 있는가
  const isDrawingRef = useRef(false);
  const previousPointRef = useRef<TouchPoint | null>(null);
  const rect = useRef<DOMRect | null>(null);

  useEffect(() => {
    console.log("useEffect");
    rect.current = canvas?.getBoundingClientRect();

    const handleResize = () => {
      rect.current = canvas?.getBoundingClientRect();
      // rect.current.height -= window.scrollY;
    };
    const handleScroll = () => {
      rect.current = canvas?.getBoundingClientRect();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [canvas]);

  const drawFn = (e: React.MouseEvent<HTMLCanvasElement>) => {
    //마우스가 캔버스 위에 올라가있을때
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;

    if (!painting) {
      //그리는 행위 중이 아님
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else {
      //그리는 행위 중
      getCtx.lineTo(mouseX, mouseY);
      getCtx.stroke();
      setHasPaintBefore(true);
    }
  };

  const touchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    // console.log("터치 시작");
    setPainting(true)
    setHasPaintBefore(true);

    const touch = e.touches[0];
    const touchX = touch.pageX - rect.current!.left + canvasBox.scrollLeft;
    const touchY = touch.clientY - rect.current!.top;

    // console.log("1: ", touch.clientY);
    // console.log("2: ", rect.current!.top);
    // console.log("3: ", touchY);

    isDrawingRef.current = true;
    previousPointRef.current = { x: touchX, y: touchY };
  };

  const touch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    // console.log("터치 중");

    if (!isDrawingRef.current) return;

    const touch = e.touches[0];
    const touchX = touch.pageX - rect.current!.left + canvasBox.scrollLeft;
    const touchY = touch.clientY - rect.current!.top;

    if (previousPointRef.current) {
      getCtx.beginPath();
      getCtx.moveTo(previousPointRef.current.x, previousPointRef.current.y);
      getCtx.lineTo(touchX, touchY);
      getCtx.stroke();
      previousPointRef.current = { x: touchX, y: touchY };
    }
  };

  const touchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    // console.log("터치 끝");

    isDrawingRef.current = false;
    previousPointRef.current = null;

    setPainting(false)
  };

  return {
    drawFn,
    touchStart,
    touch,
    touchEnd,
    painting,
    hasPaintBefore,
    setPainting,
  };
}
