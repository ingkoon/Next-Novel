import style from './Type7.module.css';
import TypeIt from "typeit-react";

export default function Type7() {
  return (
    <div className={style.wrapper1}>
      <TypeIt className={style.bbb}
          options={{
            strings: ['금상첨화. 화룡정점.','그림까지 맡겨주세요'],
            speed: 20,
            waitUntilVisible: true,
          }}
        />
    </div>
  );
}
