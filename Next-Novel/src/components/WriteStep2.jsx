import React, { useState } from "react";
import Canvas1 from "./Canvas1";
import Guide from "./Guide";
import Preview from "./Preview";
import "./WriteStep2.css";

export default function WriteStep2({ setStep, step }) {
  const [imageSrcs, setImageSrcs] = useState(
    Array.from({ length: 6 }, () => undefined)
  );
  const [selected, setSelected] = useState(0);

  return (
    <div className="write-step2-container">
      <div>
        <Preview imageSrcs={imageSrcs} setSelected={setSelected} />
        <Canvas1
          imageSrcs={imageSrcs}
          setImageSrcs={setImageSrcs}
          selected={selected}
        />
      </div>
      <button onClick={() => setStep(3)}>제출</button>
      <Guide step={step} />
    </div>
  );
}
