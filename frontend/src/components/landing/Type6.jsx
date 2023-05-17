import style from './Type6.module.css';
import TypeIt from "typeit-react";

export default function Type6() {

  return (
    <div className={style.wrapper}>
      <TypeIt className={style.bbb}
          options={{
              strings: ['고도로 발전한 과학기술은 마법과도 같이 느껴지죠','인공지능과 인간의 상상력이 합쳐진 collaboration!'],
              speed: 10,
              waitUntilVisible: true,
          }}
        />
    </div>
  );
}
