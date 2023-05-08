import { useState } from "react";

type CheckReadyProps = {
  order: string;
  imageSrcs?: (string | undefined)[];
  novelCover?: string;
  input?: Input;
};
type Input = {
  title: string;
  desc: string;
};
export default function useCheckReady() {
  const [isShaking, setIsShaking] = useState(false);

  function checkReady({
    order,
    imageSrcs,
    novelCover,
    input,
  }: CheckReadyProps) {
    if (order === "imageSrcs") {
      if (!imageSrcs) return;
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
      if (!input) return;
      if (input.title.length === 0 || input.desc.length === 0) {
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
