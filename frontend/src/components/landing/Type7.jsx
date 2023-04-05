import style from './Type7.module.css';
import { useEffect, useRef } from 'react';

export default function Type7() {
  const typeitRef = useRef(null);

  useEffect(() => {
    const startTypingAnimation = () => {
      const instance = new window.TypeIt(typeitRef.current, {
        strings: ['금상첨화. 화룡정점.','그림까지 맡겨주세요'],
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
    <div className={style.wrapper1}>
      <div ref={typeitRef} className={style.bbb}></div>
    </div>
  );
}
