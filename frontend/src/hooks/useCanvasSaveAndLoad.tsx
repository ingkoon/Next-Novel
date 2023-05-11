import { useEffect, useReducer } from "react";

type CanvasSaveAndLoadProps = {
  getCtx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  imageSrcs: (string | undefined)[];
  setImageSrcs: React.Dispatch<React.SetStateAction<(string | undefined)[]>>;
  selected: number;
  painting: boolean;
  hasPaintBefore: boolean;
  data: DataType[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
};
type DataType = {
  imageName: string;
  caption: string;
};
type State = (string | undefined)[];
type Action =
  | { type: "increment"; dataURL: string }
  | { type: "decrement" }
  | { type: "init" };
export default function useCanvasSaveAndLoad({
  getCtx,
  canvasWidth,
  canvasHeight,
  imageSrcs,
  setImageSrcs,
  selected,
  painting,
  hasPaintBefore,
  data,
  canvasRef,
}: CanvasSaveAndLoadProps) {
  const [store, dispatch] = useReducer(reducer, [imageSrcs[selected]]); //뒤로가기 저장소
  const paintings = data;

  function reducer(state: State, action: Action): State {
    //저장소 간리
    switch (action.type) {
      case "increment": //그리기
        return [...state, action.dataURL];
      case "decrement": //뒤로가기
        return [...state.slice(0, state.length - 1)];
      case "init": //초기화
        return [imageSrcs[selected]];
      default:
        throw new Error();
    }
  }

  useEffect(() => {
    if (getCtx) {
      getCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      getCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    } //현재 캔버스 초기화

    const img = new Image();
    img.src = imageSrcs[selected] || "";
    img.onload = () => getCtx.drawImage(img, 0, 0); //캔버스 불러오기

    dispatch({ type: "init" }); //저장소 초기화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]); //n번째 캔버스 선택시

  useEffect(() => {
    if (!painting && hasPaintBefore) {
      //그림그리는상태가 아니고, 그렸던 적이 있다!
      const canvas = canvasRef.current;
      const dataURL = canvas!.toDataURL();
      setImageSrcs(
        imageSrcs.map((imageSrc, index) =>
          index === selected ? dataURL : imageSrc
        )
      ); //현재 캔버스를 완성그림에 저장하고
      dispatch({ type: "increment", dataURL }); //저장소에 기록을 추가
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [painting]); //그림그리는 행위를 하는 상태

  const goBack = () => {
    //뒤로가기
    if (store.length === 1) return; //처음 상태면 return

    dispatch({ type: "decrement" }); //저장소에서 맨 뒤 지우기

    const dataURL = store[store.length - 2]; //dispatch가 비동기라서 -2를 하여 불러옴

    getCtx.clearRect(0, 0, canvasWidth, canvasHeight); //현재 캔버스 초기화
    getCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    const img = new Image();
    img.src = dataURL || "";
    img.onload = () => getCtx.drawImage(img, 0, 0); //이전 이미지 불러오기

    setImageSrcs(
      imageSrcs.map((imageSrc, index) =>
        index === selected ? dataURL : imageSrc
      )
    ); //완성 그림에 전달
  };

  const initCanvas = () => {
    //쓰레기통으로 캔버스 초기화
    getCtx.clearRect(0, 0, canvasWidth, canvasHeight); //현재 캔버스 초기화
    getCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    setImageSrcs(
      imageSrcs.map((imageSrc, index) =>
        index === selected ? undefined : imageSrc
      )
    ); //완성 그림에 undefined 전달
    dispatch({ type: "init" }); //저장소 초기화
  };

  const loadToCanvas = (choose: number) => {
    const dataURL = `data:image/png;base64,` + paintings[choose];

    const img = new Image();
    img.src = dataURL;
    img.onload = () => getCtx.drawImage(img, 0, 0); //이전 이미지 불러오기

    setImageSrcs(
      imageSrcs.map((imageSrc, index) =>
        index === selected ? dataURL : imageSrc
      )
    ); //현재 캔버스를 완성그림에 저장하고
    dispatch({ type: "increment", dataURL }); //저장소에 기록을 추가
  };

  return { loadToCanvas, goBack, initCanvas };
}
