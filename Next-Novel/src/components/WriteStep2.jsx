import React, { useState } from "react";
import Canvas from "./Canvas";
import Preview from "./Preview";
import "./WriteStep2.css";

export default function WriteStep2({ setStep }) {
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 6 }, () => undefined)
  );
  const [selected, setSelected] = useState(0);

  return (
    <div className="write-step2-container">
      <div>
        <Preview imageSrcs={imageSrcs} setSelected={setSelected} />
        <Canvas
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
        />
      </div>
      <button onClick={() => setStep(3)}>제출</button>
    </div>
  );
}
