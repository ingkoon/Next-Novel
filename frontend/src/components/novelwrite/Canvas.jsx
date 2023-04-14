import React, { useEffect, useRef, useState, useReducer } from "react";
import style from "./Canvas.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";
import useCanvasPaintingTool from "../../hooks/useCanvasPaintingTool";
import useFileToDataurl from "../../hooks/useFileToDataurl";
import useCanvasIsPainting from "../../hooks/useCanvasIsPainting";

export default function Canvas({
  imageSrcs,
  setImageSrcs,
  selected,
  canvasWidth,
  canvasHeight,
  canvasType,
}) {
  const canvasRef = useRef(null); //canvas
  const [getCtx, setGetCtx] = useState(null); //canvas
  const [rect, setRect] = useState(); //터치용

  const [store, dispatch] = useReducer(reducer, [imageSrcs[selected]]); //뒤로가기 저장소
  const {
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
  } = useCanvasPaintingTool([getCtx]);
  const {
    getPaintings: { refetch, data },
  } = useNovelWrite();
  const { paintings } = useFileToDataurl([data]);
  const {
    drawFn,
    touchStart,
    touch,
    touchEnd,
    painting,
    hasPaintBefore,
    setPainting,
  } = useCanvasIsPainting([getCtx, widthState, rect]);

  const [loadState, setLoadState] = useState(false);
  const loadToCanvas = (choose) => {
    const dataURL = paintings[choose];

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

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    setRect(canvas.getBoundingClientRect());
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = widthState;
    ctx.strokeStyle = colorState;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    setGetCtx(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //맨 처음 컴포넌트 설정

  useEffect(() => {
    if (getCtx) {
      getCtx.clearRect(0, 0, canvasWidth, canvasHeight);
      getCtx.fillRect(0, 0, canvasWidth, canvasHeight);
    } //현재 캔버스 초기화

    const img = new Image();
    img.src = imageSrcs[selected];
    img.onload = () => getCtx.drawImage(img, 0, 0); //캔버스 불러오기

    dispatch({ type: "init" }); //저장소 초기화
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]); //n번째 캔버스 선택시

  useEffect(() => {
    if (!painting && hasPaintBefore) {
      //그림그리는상태가 아니고, 그렸던 적이 있다!
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL();
      setImageSrcs(
        imageSrcs.map((imageSrc, index) =>
          index === selected ? dataURL : imageSrc
        )
      ); //현재 캔버스를 완성그림에 저장하고
      dispatch({ type: "increment", dataURL }); //저장소에 기록을 추가
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [painting]); //그림그리는 행위를 하는 상태

  function reducer(state, action) {
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

  const goBack = () => {
    //뒤로가기
    if (store.length === 1) return; //처음 상태면 return

    dispatch({ type: "decrement" }); //저장소에서 맨 뒤 지우기

    const dataURL = store[store.length - 2]; //dispatch가 비동기라서 -2를 하여 불러옴

    getCtx.clearRect(0, 0, canvasWidth, canvasHeight); //현재 캔버스 초기화
    getCtx.fillRect(0, 0, canvasWidth, canvasHeight);

    const img = new Image();
    img.src = dataURL;
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

  return (
    <div className={style.container}>
      <div className={`${style.canvas} ${style[canvasType]}`}>
        <canvas
          ref={canvasRef}
          onMouseDown={() => setPainting(true)}
          onMouseUp={() => {
            setPainting(false);
          }}
          onMouseMove={(e) => drawFn(e)}
          onMouseLeave={() => {
            setPainting(false);
          }}
          onTouchStart={(e) => {
            touchStart(e);
          }}
          onTouchMove={(e) => {
            touch(e);
          }}
          onTouchEnd={(e) => {
            touchEnd(e);
          }}
        />
      </div>
      <div className={style.tools}>
        <div className={`${style.tool1} ${penSelected ? style.selected : ""}`}>
          <img
            src={process.env.PUBLIC_URL + `/icon/pen.svg`}
            alt="pen"
            onClick={() => {
              onPencil();
              setPenSelected(true);
              setEraserSelected(false);
            }}
          />
        </div>
        <div
          className={`${style.tool2} ${eraserSelected ? style.selected : ""}`}
        >
          <img
            src={process.env.PUBLIC_URL + `/icon/eraser.svg`}
            alt="eraser"
            onClick={() => {
              onEraser();
              setPenSelected(false);
              setEraserSelected(true);
            }}
          />
        </div>
        <div className={style.tool3}>
          <div
            style={{
              width: "50px",
              height: "30px",
              backgroundColor: `${colorState}`,
              border: "3px solid black",
            }}
            onClick={openSetColor}
          />
          {openSetColorState && (
            <div className={style.setColor}>
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    margin: "5px",
                  }}
                  data-color={color}
                  onClick={(event) => {
                    setColor(event);
                    openSetColor();
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className={style.tool4}>
          <div
            style={{
              width: "50px",
              height: "30px",
              backgroundColor: "white",
              border: "3px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={openSetWidth}
          >
            <div
              style={{
                width: `${widthState}px`,
                height: `${widthState}px`,
                backgroundColor: "black",
                borderRadius: "50%",
              }}
            />
          </div>
          {openSetWidthState && (
            <div className={style.setWidth}>
              <input
                type="range"
                min="1"
                max="20"
                defaultValue={widthState}
                step="0.1"
                onMouseUp={(event) => {
                  setWidth(event);
                  openSetWidth();
                }}
              />
            </div>
          )}
        </div>
        <div className={style.tool5}>
          <img
            src={process.env.PUBLIC_URL + `/icon/back.svg`}
            alt="back"
            onClick={goBack}
          />
        </div>
        <div className={style.tool6}>
          <img
            src={process.env.PUBLIC_URL + `/icon/clear.svg`}
            alt="clear"
            onClick={initCanvas}
          />
        </div>
      </div>
      {canvasType === "big" && (
        <>
          <div
            className={style.openLoadButton}
            onClick={() => {
              setLoadState((prev) => !prev);
              refetch();
            }}
          >
            <img
              src={process.env.PUBLIC_URL + `/icon/history.svg`}
              alt="history"
            />
          </div>
          {loadState && (
            <div className={style.load}>
              <div className={style.tap}>
                <span>그림 불러오기</span>
                <button onClick={() => setLoadState(false)}>X</button>
              </div>
              <div className={style.paintings}>
                <div className={style.scroll}>
                  {data?.map((image, index) => (
                    <img
                      src={image.image}
                      alt=""
                      key={index}
                      onClick={() => {
                        loadToCanvas(index);
                        setLoadState(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
