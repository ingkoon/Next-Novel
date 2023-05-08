import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas from "./Canvas";
import style from "./WriteStep5a.module.css";
import { useNovelContext } from "../../context/NovelContext";
import LoadingModal from "../common/LoadingModal";
import useNovelWrite from "../../hooks/useNovelWrite";
import useCheckReady from "../../hooks/useCheckReady";
import useDataurlToFile from "../../hooks/useDataurlToFile";

export default function WriteStep5a() {
  const [imageSrcs, setImageSrcs] = useState<(string | undefined)[]>(
    Array.from({ length: 1 }, () => undefined)
  );
  const selected = 0;
  const { novel, setNovel, setStep } = useNovelContext();
  const { makeCoverRequest } = useNovelWrite();
  const { isShaking, checkReady } = useCheckReady();
  const { dataurlToFile } = useDataurlToFile();

  const button = () => {
    //표지 유효성 검사 코드
    if (!checkReady({ order: "novelCover", novelCover: novel.cover })) return;

    setStep(5.5);
  };
  const makeCover = () => {
    //그림 유효성 검사
    if (!checkReady({ order: "imageSrcs", imageSrcs: imageSrcs })) return;
    const files = dataurlToFile(imageSrcs);
    const formData = appendFormData(files);

    makeCoverRequest.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);

        let reader = new FileReader();
        reader.readAsDataURL(res.data);
        reader.onload = function() {
          let dataUrl = reader.result!.toString();
          setNovel({
            ...novel,
            cover: dataUrl,
            oldCover: imageSrcs[0]!,
          });
        };
      },
    });
  };
  const appendFormData = (files: File[]) => {
    const formData = new FormData();
    formData.append("image", files[0]);

    return formData;
  };

  return (
    <div className={style.container}>
      <LoadingModal state={makeCoverRequest.isLoading} />
      <div className={style.component}>
        <div className={style.left}>
          <Canvas
            imageSrcs={imageSrcs}
            setImageSrcs={setImageSrcs}
            selected={selected}
            canvasType={"small"}
          />
        </div>
        <div className={style.middle}>
          <button className={style.toggle} onClick={makeCover}>
            표지 생성
          </button>
        </div>
        <div className={style.right}>
          <div className={style.frame}>
            {novel.cover && (
              <img src={novel.cover} className={style.cover} alt="cover" />
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
      <Bottom name="제출" button={button} isShaking={isShaking} />
    </div>
  );
}
