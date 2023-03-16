import React from "react";

export default function BeforeStartWrite({ step, setStep }) {
  return (
    <div>
      <h1>작업실 컴포넌트</h1>
      <div>
        <h2>내가 그리고 AI가 써주는 소설을 만들어볼까요?</h2>
        <button onClick={() => setStep(1)}>시작하기</button>
      </div>
    </div>
  );
}
