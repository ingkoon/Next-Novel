import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas1 from "./Canvas1";
import Preview from "./Preview";
import style from "./WriteStep2.module.css";
import useNovelWrite from "../../hooks/useNovelWrite";
import Modal from "react-modal";

export default function WriteStep2({ setStep, step, genreName }) {
  const { startNovel } = useNovelWrite();
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 6 }, () => undefined)
  );
  const [selected, setSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const button = () => {
    setIsLoading((prev) => !prev);

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
        setIsLoading((prev) => !prev);
        setStep(3);
      },
    });
  };

  return (
    <div className={style.container}>
      <Modal
        isOpen={isLoading}
        style={{
          overlay: {},
          content: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            inset: "0",
            background: "none",
          },
        }}
      >
        <img src={process.env.PUBLIC_URL + `/img/loading.gif`} alt="loading" />
      </Modal>
      <div className={style.component}>
        <Preview imageSrcs={imageSrcs} setSelected={setSelected} />
        <Canvas1
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
        />
      </div>
      <Bottom step={step} name="제출" button={button} />
    </div>
  );
}
