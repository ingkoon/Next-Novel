import React from "react";

export default function PaintingInProgress() {
  const data = {
    text: "orange",
    painting:
      "https://images.unsplash.com/photo-1609424572698-04d9d2e04954?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  };
  const tempDatas1 = Array.from({ length: 6 }, () => data);
  const tempDatas2 = Array.from({ length: 6 }, () => data);

  return (
    <div>
      <div>
        {tempDatas1.map((tempData) => (
          <div>
            <img src={tempData.painting} alt="dd" />
            {tempData.text}
          </div>
        ))}
      </div>
      <div>
        {tempDatas2.map((tempData) => (
          <div>
            <div>
              ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
            </div>
            <img src={tempData.painting} alt="dd" />
            {tempData.text}
          </div>
        ))}
      </div>
    </div>
  );
}
