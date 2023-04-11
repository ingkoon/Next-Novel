import style from './Type6.module.css';
import { useEffect, useRef } from 'react';

export default function Type6() {
  const typeitRef = useRef(null);

  useEffect(() => {
    const startTypingAnimation = () => {
      const instance = new window.TypeIt(typeitRef.current, {
        strings: ['고도로 발전한 과학기술은 마법과도 같이 느껴지죠','인공지능과 인간의 상상력이 합쳐진 collaboration!'],
        speed: 10,
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
