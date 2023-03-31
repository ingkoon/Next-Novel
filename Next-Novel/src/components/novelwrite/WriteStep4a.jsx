import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas2 from "./Canvas2";
import Question from "./Question";
import style from "./WriteStep4a.module.css";
import { useNovelContext } from "../../context/NovelContext";

export default function WriteStep4a({ setStep, count, step }) {
  const { novel, setNovel } = useNovelContext();

  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 1 }, () => undefined)
  );
  const selected = 0;
  const button = () => {
    // const byteStrings = imageSrcs.map((dataUrl) =>
    //   window.atob(dataUrl.split(",")[1])
    // );
    // const arrays = byteStrings.map((byteString) => {
    //   let array = [];
    //   for (let i = 0; i < byteString.length; i++) {
    //     array.push(byteString.charCodeAt(i));
    //   }
    //   return array;
    // });
    // const myBlobs = arrays.map(
    //   (array) => new Blob([new Uint8Array(array)], { type: "image/png" })
    // );
    // const files = myBlobs.map(
    //   (myBlob, index) =>
    //     new File([myBlob], "".concat("material", index, ".png"))
    // );
    // // console.log(files);
    // const formData = new FormData();
    // formData.append("step", novel.step);
    // formData.append("novel_id", novel.id);
    // formData.append("query", novel.query);
    // formData.append("images", files[[0]]);
    // startNovel.mutate(formData, {
    //   onSuccess: (res) => {
    //     console.log(res);
    //     //context 제어
    //     setNovel({
    //       ...novel,
    //       story : novel.story+res.data.story,
    //       //captions :
    //     });
    //     setStep(4.5);
    //   },
    // });
    setStep(4.5);
  };

  return (
    <div className={style.container}>
      <div className={style.component}>
        <Question count={count} />
        <Canvas2
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
        />
      </div>
      <Bottom step={step} name="제출" button={button} />
    </div>
  );
}
