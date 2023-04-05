import style from './Type4.module.css';
import { useEffect, useRef } from 'react';

export default function Type4() {
  const typeitRef = useRef(null);

  useEffect(() => {
    const startTypingAnimation = () => {
      const instance = new window.TypeIt(typeitRef.current, {
        strings: ['그림에 자신이 없다구요? 걱정하지 마세요!','AI 이미지 캡셔닝이 찰떡같이 인식할겁니다'],
        speed: 15,
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
      <div ref={typeitRef} className={style.bbb}></div>
    </div>
  );
}
