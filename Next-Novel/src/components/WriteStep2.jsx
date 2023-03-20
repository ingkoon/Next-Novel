import React, { useState } from "react";
import Canvas1 from "./Canvas1";
import Preview from "./Preview";
import style from "./WriteStep2.module.css";

export default function WriteStep2({ setStep }) {
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 6 }, () => undefined)
  );
  const [selected, setSelected] = useState(0);

  return (
    <div className={style.write_step3_container}>
      <div>
        <Preview imageSrcs={imageSrcs} setSelected={setSelected} />
        <Canvas1
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
        />
      </div>
      <button onClick={() => setStep(3)}>제출</button>
    </div>
  );
}
