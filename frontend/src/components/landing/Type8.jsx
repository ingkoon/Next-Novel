import style from './Type8.module.css';
import TypeIt from "typeit-react";

export default function Type8() {
  return (
    <div className={style.wrapper}>
      <TypeIt className={style.bbb}
          options={{
            strings: ['알아서 잘 딱 깔끔하고 센스있게,','Stable Diffusion으로', '아름다운 표지를 장식할 것입니다'],
            speed: 15,
            waitUntilVisible: true,
          }}
        />
    </div>
  );
}
