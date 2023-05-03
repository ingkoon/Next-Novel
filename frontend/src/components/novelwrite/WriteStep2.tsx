import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas from "./Canvas";
import Preview from "./Preview";
import style from "./WriteStep2.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";
import { useNovelContext } from "../../context/NovelContext";
import LoadingGameModal from "../common/LoadingGameModal";
import useCheckReady from "../../hooks/useCheckReady";
import useDataurlToFile from "../../hooks/useDataurlToFile";

export default function WriteStep2() {
  const { novel, setNovel, setStep } = useNovelContext();
  const { startNovel } = useNovelWrite();
  const [imageSrcs, setImageSrcs] = useState<(string | undefined)[]>(
    Array.from({ length: 6 }, () => undefined)
  );
  const [selected, setSelected] = useState(0);
  const { isShaking, checkReady } = useCheckReady();
  const { dataurlToFile } = useDataurlToFile();

  const button = () => {
    //그림 유효성 검사
    if (!checkReady({ order: "imageSrcs", imageSrcs: imageSrcs })) return;
    const files = dataurlToFile(imageSrcs);
    const formData = appendFormData(files);

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

  const appendFormData = (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    formData.append("genre", novel.genre);
    formData.append("authorId", "1234");

    return formData;
  };

  return (
    <div className={style.container}>
      <LoadingGameModal state={startNovel.isLoading} />
      <div className={style.component}>
        <Preview imageSrcs={imageSrcs} setSelected={setSelected} />
        <Canvas
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
          canvasType={"big"}
        />
      </div>
      <Bottom name="제출" button={button} isShaking={isShaking} />
    </div>
  );
}
