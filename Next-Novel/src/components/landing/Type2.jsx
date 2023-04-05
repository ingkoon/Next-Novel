import style from './Type2.module.css';
import { useEffect, useRef } from 'react';

export default function Type2() {
  const typeitRef = useRef(null);

  useEffect(() => {
    const startTypingAnimation = () => {
      const instance = new window.TypeIt(typeitRef.current, {
        strings: ['머릿속 소재들이 간단하게 하나의 이야기로', '뚝딱 완성되는, 그런 마법같은 상상',' ','넥스트노벨에서 체험해보세요','생각치도 못한 놀라운 이야기들이 당신을 기다립니다'],
        speed: 20,
        loop: false,
      });

      instance.go();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTypingAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1.0, // The observer callback will be called when the element is 100% visible
      }
    );

    if (typeitRef.current) {
      observer.observe(typeitRef.current);
    }

    return () => {
      if (typeitRef.current) {
        observer.unobserve(typeitRef.current);
      }
    };
  }, []);

  return (
    <div className={style.wrapper}>
      <div ref={typeitRef} className={style.aaa}></div>
      <div className={style.next}>
        scroll down↓
      </div>
    </div>
  );
}
