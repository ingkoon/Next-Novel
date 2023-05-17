import style from './Type5.module.css';
import TypeIt from "typeit-react";

export default function Type5() {
  return (
    <div className={style.wrapper1}>
      <TypeIt className={style.bbb}
          options={{
            strings: ['상상 그 이상. Chat-GPT'],
            speed: 50,
            waitUntilVisible: true,
          }}
        />
    </div>
  );
}
