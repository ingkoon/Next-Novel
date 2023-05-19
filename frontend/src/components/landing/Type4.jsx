import style from './Type4.module.css';
import TypeIt from "typeit-react";

export default function Type4() {

  return (
    <div className={style.wrapper}>
      <TypeIt className={style.bbb}
          options={{
            strings: ['그림에 자신이 없다구요? 걱정하지 마세요!','AI 이미지 캡셔닝이 찰떡같이 인식할겁니다'],
            speed: 15,
            waitUntilVisible: true,
          }}
        />
    </div>
  );
}
