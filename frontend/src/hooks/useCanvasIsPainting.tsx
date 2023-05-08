import { useState } from "react";

type CanvasIsPaintingProps = {
  getCtx: CanvasRenderingContext2D;
  rect: DOMRect;
};
export default function useCanvasIsPainting({
  getCtx,
  rect,
}: CanvasIsPaintingProps) {
  const [painting, setPainting] = useState(false); //그림을 그리고 있는지 아닌지
  const [hasPaintBefore, setHasPaintBefore] = useState(false); //그림을 그렸던 적이 한번이라도 있는가
  const [lasttouchX, setLastTouchX] = useState<number>(0); //캔버스 내 터치 좌표
  const [lasttouchY, setLastTouchY] = useState<number>(0); //캔버스 내 터치 좌표
  const tempWidthState = 2.5; //터치 임시용

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
    getCtx.beginPath();
    setPainting(true);
    setLastTouchX(e.touches[0].pageX - rect.left);
    setLastTouchY(e.touches[0].pageY - rect.top);
    getCtx.moveTo(
      e.touches[0].pageX - rect.left,
      e.touches[0].pageY - rect.top
    );

    getCtx.arc(
      e.touches[0].pageX - rect.left,
      e.touches[0].pageY - rect.top,
      tempWidthState / 2,
      0,
      2 * Math.PI
    );
    getCtx.stroke();
  };

  const touch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (painting) {
      getCtx.moveTo(lasttouchX, lasttouchY);
      let x = e.touches[0].pageX - rect.left;
      let y = e.touches[0].pageY - rect.top;
      getCtx.lineTo(x, y);
      setLastTouchX(e.touches[0].pageX - rect.left);
      setLastTouchY(e.touches[0].pageY - rect.top);
      getCtx.stroke();
      setLastTouchX(x);
      setLastTouchY(y);
    }
  };

  const touchEnd = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setPainting(false);
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
