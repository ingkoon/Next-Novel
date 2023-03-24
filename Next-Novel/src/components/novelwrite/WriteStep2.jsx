import React, { useState } from "react";
import Bottom from "./Bottom";
import Canvas1 from "./Canvas1";
import Preview from "./Preview";
import style from "./WriteStep2.module.css";

export default function WriteStep2({ setStep, step }) {
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 6 }, () => undefined)
  );
  const [selected, setSelected] = useState(0);
  const button = () => setStep(3);

  return (
    <div className={style.container}>
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
