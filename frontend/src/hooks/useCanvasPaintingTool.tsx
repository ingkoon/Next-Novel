import { useState } from "react";

type CanvasPaintingToolProps = {
  getCtx: CanvasRenderingContext2D;
};
export default function useCanvasPaintingTool({
  getCtx,
}: CanvasPaintingToolProps) {
  const [widthState, setWidthState] = useState(2.5); //펜 굵기 초기값
  const [colorState, setColorState] = useState("#000000"); //펜 색 초기값
  const [openSetWidthState, setOpenSetWidthState] = useState(false); //펜 굵기 설정 탭 on/off
  const [openSetColorState, setOpenSetColorState] = useState(false); //펜 색 설정 탭 on/off
  const [penSelected, setPenSelected] = useState(true);
  const [eraserSelected, setEraserSelected] = useState(false);
  const colors = [
    "#ed1c24",
    "#d81758",
    "#ffaec9",
    "#8a23a4",
    "#5a34ad",
    "#3c49ab",
    "#3fa0f1",
    "#44b4cd",
    "#328b7d",
    "#55a549",
    "#87bb44",
    "#c7d737",
    "#fce739",
    "#f7b816",
    "#f48c10",
    "#f14b20",
    "#6a4b3f",
    "#597280",
    "#c1c1c1",
    "#6f6f6f",
    "#000000",
  ]; //컬러파레트 색상

  const onPencil = () => {
    //펜 선택
    getCtx.strokeStyle = colorState;
  };
  const onEraser = () => {
    //지우개 선택
    getCtx.strokeStyle = "white";
  };
  const openSetWidth = () => {
    //펜 굵기 설정 탭 열기
    setOpenSetWidthState((prev) => !prev);
    setOpenSetColorState(false);
  };
  const setWidth = (
    event:
      | React.MouseEvent<HTMLInputElement>
      | React.TouchEvent<HTMLInputElement>
  ) => {
    //펜 굵기 설정하기
    console.log(event);
    setWidthState(parseInt(event.currentTarget.value));
    getCtx.lineWidth = parseInt(event.currentTarget.value);
  };
  const openSetColor = () => {
    //펜 색 설정 탭 열기
    setOpenSetColorState((prev) => !prev);
    setOpenSetWidthState(false);
  };
  const setColor = (event: React.MouseEvent<HTMLDivElement>) => {
    //펜 색 설정하기
    setColorState(event.currentTarget.dataset.color!);
    if (penSelected) {
      getCtx.strokeStyle = event.currentTarget.dataset.color!;
    }
  };

  return {
    onPencil,
    onEraser,
    openSetWidth,
    setWidth,
    openSetColor,
    setColor,
    colors,
    widthState,
    colorState,
    penSelected,
    eraserSelected,
    setPenSelected,
    setEraserSelected,
    openSetWidthState,
    openSetColorState,
  };
}
