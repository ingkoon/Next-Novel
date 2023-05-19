import style from "./Type2.module.css";
import { useEffect, useRef } from "react";
import TypeIt from "typeit-react";

export default function Type2() {
  return (
    <div className={style.wrapper}>
      <TypeIt
        className={style.aaa}
        options={{
          strings: [
            "머릿속 소재들이 간단하게 하나의 이야기로",
            "뚝딱 완성되는, 그런 마법같은 상상",
            " ",
            "넥스트노벨에서 체험해보세요",
            "생각치도 못한 놀라운 이야기들이 당신을 기다립니다",
          ],
          speed: 20,
          waitUntilVisible: true,
        }}
      />
    </div>
  );
}
