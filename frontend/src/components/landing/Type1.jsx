import style from "./Type1.module.css";
import TypeIt from "typeit-react";

export default function Type1() {
  return (
    <div className={style.wrapper}>
      <TypeIt
        className={style.aaa}
        options={{
          strings: ["이런 상상 해본적 있나요?"],
          speed: 50,
          waitUntilVisible: true,
        }}
      />
    </div>
  );
}
