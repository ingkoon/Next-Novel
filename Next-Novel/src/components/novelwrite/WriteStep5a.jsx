import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas3 from "./Canvas3";
import style from "./WriteStep5a.module.css";
import { useNovelContext } from "../../context/NovelContext";
import LoadingModal from "../common/LoadingModal";
import useNovelWrite from "../../hooks/useNovelWrite";

export default function WriteStep5a({ setStep, step }) {
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 1 }, () => undefined)
  );
  const selected = 0;
  const { novel, setNovel } = useNovelContext();
  const { makeCoverRequest } = useNovelWrite();

  const button = () => {
    //표지 유효성 검사 코드
    if (!novel.cover) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 800); // 0.8초 후 클래스 제거
      return;
    }
    setStep(5.5);
  };
  const makeCover = () => {
    //그림 유효성 검사
    for (let imageSrc of imageSrcs) {
      if (!imageSrc) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 800); // 0.8초 후 클래스 제거
        return;
      }
    }
    //api에서 커버 생성하기
    const byteStrings = imageSrcs.map((dataUrl) =>
      window.atob(dataUrl.split(",")[1])
    );
    const arrays = byteStrings.map((byteString) => {
      let array = [];
      for (let i = 0; i < byteString.length; i++) {
        array.push(byteString.charCodeAt(i));
      }
      return array;
    });
    const myBlobs = arrays.map(
      (array) => new Blob([new Uint8Array(array)], { type: "image/png" })
    );
    const files = myBlobs.map(
      (myBlob, index) =>
        new File([myBlob], "".concat("material", index, ".png"))
    );
    // console.log(files);
    const formData = new FormData();
    formData.append("novel_id", novel.id);
    formData.append("image", files[0]);
    makeCoverRequest.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        //context 제어
        setNovel({
          ...novel,
          cover: res.data.image,
        });
      },
    });
  };
  const [isShaking, setIsShaking] = useState(false);

  return (
    <div className={style.container}>
      <LoadingModal state={makeCoverRequest.isLoading} />
      <div className={style.component}>
        <div className={style.left}>
          <div className={style.input}>
            <div className={style.canvas}>
              <Canvas3
                imageSrcs={imageSrcs}
                setImageSrcs={setImageSrcs}
                selected={selected}
              />
            </div>
          </div>
          <div className={style.space} />
        </div>
        <div className={style.middle}>
          <button className={style.toggle} onClick={makeCover}>
            표지 생성
          </button>
        </div>
        <div className={style.right}>
          {/* <div className={style.space} /> */}
          <div className={style.result}>
            <div className={style.img}>
              <div className={style.frame}>
                {novel.cover && (
                  <img
                    src={process.env.REACT_APP_IMAGE_API + novel.cover}
                    className={style.cover}
                    alt="cover"
                  />
                )}
                {!novel.cover && (
                  <img
                    src={process.env.PUBLIC_URL + "/icon/cover_wait.svg"}
                    className={style.cover_wait}
                    alt="cover_wait"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom step={step} name="제출" button={button} isShaking={isShaking} />
    </div>
  );
}
