import style from './Type99.module.css';
import TypeIt from "typeit-react";

export default function Type99() {
  return (
    <div className={style.wrapper}>
      <TypeIt className={style.bbb}
          options={{
            strings: ['이 모든 과정이 놀랍도록 단순합니다','그림 몇장으로 나만의 그림소설을 완성해보세요'],
            speed: 15,
            waitUntilVisible: true,
          }}
        />
    </div>
  );
}
