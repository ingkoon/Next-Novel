import { useState } from "react";

export default function useCanvasIsPainting([getCtx, widthState, rect]) {
  const [painting, setPainting] = useState(false); //그림을 그리고 있는지 아닌지
  const [hasPaintBefore, setHasPaintBefore] = useState(false); //그림을 그렸던 적이 한번이라도 있는가
  const [mouseX, setmouseX] = useState(); //캔버스 내 마우스 좌표
  const [mouseY, setmouseY] = useState(); //캔버스 내 마우스 좌표
  const [lasttouchX, setLastTouchX] = useState(); //캔버스 내 터치 좌표
  const [lasttouchY, setLastTouchY] = useState(); //캔버스 내 터치 좌표

  const drawFn = (e) => {
    //마우스가 캔버스 위에 올라가있을때
    setmouseX(e.nativeEvent.offsetX);
    setmouseY(e.nativeEvent.offsetY);

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

  const touchStart = (e) => {
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
      widthState / 2,
      0,
      2 * Math.PI
    );
    getCtx.stroke();
  };

  const touch = (e) => {
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

  const touchEnd = (e) => {
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
