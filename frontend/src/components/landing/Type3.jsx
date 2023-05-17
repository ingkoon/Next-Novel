import style from './Type3.module.css';
import TypeIt from "typeit-react";

export default function Type3() {


  return (
    <div className={style.wrapper1}>
      <TypeIt className={style.bbb}
          options={{
            strings: ['개떡같이 그려도','찰떡같이 알아본다!'],
            speed: 20,
            waitUntilVisible: true,
          }}
        />
    </div>
  );
}
