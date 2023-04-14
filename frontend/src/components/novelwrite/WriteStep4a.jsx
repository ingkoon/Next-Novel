import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas from "./Canvas";
import Question from "./Question";
import style from "./WriteStep4a.module.css";
import { useNovelContext } from "../../context/NovelContext";
import useNovelWrite from "../../hooks/useNovelWrite";
import LoadingModal from "../common/LoadingModal";
import { useQueryClient } from "@tanstack/react-query";
import useCheckReady from "../../hooks/useCheckReady";

export default function WriteStep4a() {
  const { novel, setNovel, setStep } = useNovelContext();
  const { continueNovel } = useNovelWrite();
  const queryClient = useQueryClient();
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 1 }, () => undefined)
  );
  const { isShaking, checkReady } = useCheckReady({
    imageSrcs: imageSrcs,
  });
  const selected = 0;
  // const button = () => setStep(4.5);
  const button = () => {
    //그림 유효성 검사
    if (!checkReady("imageSrcs")) return;

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
    formData.append("step", novel.step);
    formData.append("novel_id", novel.id);
    formData.append("query", novel.selectedQuestion);
    formData.append("image", files[0]);
    continueNovel.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        //context 제어
        setNovel({
          ...novel,
          story: novel.story + "\n\n" + res.data.story,
          newMaterials: [...novel.newMaterials, res.data.newMaterial],
        });
        queryClient.removeQueries({ queryKey: ["questions"] });
        setStep(4.5);
      },
    });
  };

  return (
    <div className={style.container}>
      <LoadingModal state={continueNovel.isLoading} />
      <div className={style.component}>
        <Question />
        <Canvas
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
          canvasWidth={608}
          canvasHeight={380}
          canvasType={"big"}
        />
      </div>
      <Bottom name="제출" button={button} isShaking={isShaking} />
    </div>
  );
}
