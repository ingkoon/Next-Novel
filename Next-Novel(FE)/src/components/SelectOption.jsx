import React from "react";

export default function SelectOption({ setStep, setStep2 }) {
  return (
    <div>
      <button onClick={() => setStep(5)}>완료하기</button>
      <button
        onClick={() => {
          setStep(4);
          setStep2(0);
          //이어하기 횟수 차감 함수
        }}
      >
        이어하기
      </button>
      <button onClick={() => setStep(0)}>처음부터</button>
    </div>
  );
}
