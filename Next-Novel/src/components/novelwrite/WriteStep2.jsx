import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas1 from "./Canvas1";
import Preview from "./Preview";
import style from "./WriteStep2.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";
import { useNovelContext } from "../../context/NovelContext";
import LoadingGameModal from "../common/LoadingGameModal";

export default function WriteStep2({ setStep, step, genreName }) {
  const { novel, setNovel } = useNovelContext();
  const { startNovel } = useNovelWrite();
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 6 }, () => undefined)
  );
  const [selected, setSelected] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const button = () => {
    //그림 유효성 검사
    for (let imageSrc of imageSrcs) {
      if (!imageSrc) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 800); // 0.8초 후 클래스 제거
        return;
      }
    }

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
    files.forEach((file) => formData.append("images", file));
    formData.append("genre", genreName);
    startNovel.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        //context 제어
        setNovel({
          ...novel,
          genre: res.data.genre,
          id: res.data.id,
          step: res.data.step,
          materials: res.data.materials,
          story: res.data.story,
        });
        setStep(3);
      },
    });
  };

  return (
    <div className={style.container}>
      <LoadingGameModal state={startNovel.isLoading} />
      <div className={style.component}>
        <Preview imageSrcs={imageSrcs} setSelected={setSelected} />
        <Canvas1
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
        />
      </div>
      <Bottom step={step} name="제출" button={button} isShaking={isShaking} />
    </div>
  );
}
