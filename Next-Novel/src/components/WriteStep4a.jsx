import React, { useState } from "react";
import Canvas2 from "./Canvas2";

export default function WriteStep4a({ setStep }) {
  const [imageSrcs, setImageSrcs] = useState(undefined);
  return (
    <div>
      <Canvas2 imageSrcs={imageSrcs} setImageSrcs={setImageSrcs} />
      <button onClick={() => setStep(4.5)}>제출</button>
    </div>
  );
}
