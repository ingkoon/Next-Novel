import style from './Type9.module.css';
import TypeIt from "typeit-react";

export default function Type9() {

  return (
    <div className={style.wrapper1}>
      <TypeIt className={style.bbb}
          options={{
            strings: ['Im on the','Next Novel'],
            speed: 50,
            waitUntilVisible: true,
          }}
        />
    </div>
  );
}
