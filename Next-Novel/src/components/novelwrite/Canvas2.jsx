import React, { useEffect, useRef, useState, useReducer } from "react";
import style from "./Canvas2.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";

export default function Canvas2({ imageSrcs, setImageSrcs, selected }) {
  const canvasRef = useRef(null); //canvas
  const [getCtx, setGetCtx] = useState(null); //canvas
  const [rect, setRect] = useState(); //터치용
  const [painting, setPainting] = useState(false); //그림을 그리고 있는지 아닌지
  const [mouseX, setmouseX] = useState(); //캔버스 내 마우스 좌표
  const [mouseY, setmouseY] = useState(); //캔버스 내 마우스 좌표
  const [lasttouchX, setLastTouchX] = useState(); //캔버스 내 터치 좌표
  const [lasttouchY, setLastTouchY] = useState(); //캔버스 내 터치 좌표
  const canvasWidth = 608;
  const canvasHeight = 380;

  const [widthState, setWidthState] = useState(2.5); //펜 굵기 초기값
  const [colorState, setColorState] = useState("#000000"); //펜 색 초기값
  const [openSetWidthState, setOpenSetWidthState] = useState(false); //펜 굵기 설정 탭 on/off
  const [openSetColorState, setOpenSetColorState] = useState(false); //펜 색 설정 탭 on/off
  const [store, dispatch] = useReducer(reducer, [imageSrcs[selected]]); //뒤로가기 저장소
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
  const {
    getPaintings: { refetch, data },
  } = useNovelWrite();
  const [paintings, setPaintings] = useState();
  useEffect(() => {
    if (data) {
      Promise.all(
        data.map((image) => {
          return fetch(image.image)
            .then((response) => response.blob())
            .then((blob) => {
              // Blob을 Data URL 형식으로 변환합니다.
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                  // 변환된 Data URL을 resolve 함수를 호출하여 반환합니다.
                  resolve(reader.result);
                };
              });
            });
        })
      ).then((results) => {
        // 모든 reader.result 값을 배열로 출력합니다.
        console.log(results);
        setPaintings(results);
      });
    }
  }, [data]);
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
    if (!painting) {
      //그림그리는상태가 아니고, 마우스에서 손이 떨어졌을 때
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
  const setWidth = (event) => {
    //펜 굵기 설정하기
    setWidthState(event.target.value);
    getCtx.lineWidth = event.target.value;
  };
  const openSetColor = () => {
    //펜 색 설정 탭 열기
    setOpenSetColorState((prev) => !prev);
    setOpenSetWidthState(false);
  };
  const setColor = (event) => {
    //펜 색 설정하기
    setColorState(event.target.dataset.color);
    if (penSelected) {
      getCtx.strokeStyle = event.target.dataset.color;
    }
  };
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
      <div className={style.canvas}>
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
      <div
        className={style.openLoadButton}
        onClick={() => {
          setLoadState((prev) => !prev);
          refetch();
        }}
      >
        <img src={process.env.PUBLIC_URL + `/icon/history.svg`} alt="history" />
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
    </div>
  );
}
