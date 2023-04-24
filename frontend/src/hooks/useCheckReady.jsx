import { useState } from "react";

export default function useCheckReady() {
  const [isShaking, setIsShaking] = useState(false);

  function checkReady({ order, imageSrcs, novelCover, input }) {
    if (order === "imageSrcs") {
      for (let imageSrc of imageSrcs) {
        if (!imageSrc) {
          shake();
          return false;
        }
      }
    } else if (order === "novelCover") {
      if (!novelCover) {
        shake();
        return false;
      }
    } else if (order === "input") {
      if (!input.title || !input.desc) {
        shake();
        return false;
      }
    }
    return true;
  }

  function shake() {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 800); // 0.8초 후 클래스 제거
  }

  return { isShaking, checkReady };
}
