import React from "react";

export default function SelectOption({ setStep, setStep2, count, setCount }) {
  return (
    <div>
      <button onClick={() => setStep(5)}>완료하기</button>
      {count < 5 && (
        <button
          onClick={() => {
            setStep(4);
            setStep2(0);
            setCount(count + 1);
          }}
        >
          {count}/5 이어하기
        </button>
      )}
      {count === 5 && <button disabled>5/5 이어하기</button>}
      <button onClick={() => setStep(0)}>처음부터</button>
    </div>
  );
}
