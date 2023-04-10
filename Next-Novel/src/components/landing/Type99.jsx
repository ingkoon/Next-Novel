import style from './Type99.module.css';
import { useEffect, useRef } from 'react';

export default function Type99() {
  const typeitRef = useRef(null);

  useEffect(() => {
    const startTypingAnimation = () => {
      const instance = new window.TypeIt(typeitRef.current, {
        strings: ['이 모든 과정이 놀랍도록 단순합니다','그림 몇장으로 나만의 그림소설을 완성해보세요'],
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

  const goNext = () => {
    window.scrollTo({ top: 4830, behavior: 'smooth' });
}

  return (
    <div className={style.wrapper}>
      <div ref={typeitRef} className={style.bbb}></div>
    </div>
  );
}
