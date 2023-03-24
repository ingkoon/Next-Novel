import { useEffect } from 'react';
import style from './Book.module.css'

export default function Book(){

    useEffect(() => {
        const pages = document.querySelectorAll(`.${style.page}`);
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          if (i % 2 === 0) {
            page.style.zIndex = pages.length - i;
          }
          page.pageNum = i + 1;
          page.addEventListener('click', function() {
            if (this.pageNum % 2 === 0) {
              this.classList.remove(style.flipped);
              this.previousElementSibling.classList.remove(style.flipped);
            } else {
              this.classList.add(style.flipped);
              this.nextElementSibling.classList.add(style.flipped);
            }
          });
        }
      }, []);

    return (
        <div className={style.back}>
            <div className={style.book}>
                <div className={style.pages}>
                    <div className={style.page}>
                        <div className={style.cover}>
                            <img
                                src="https://i.pinimg.com/564x/f6/13/14/f61314f3ff9441fc1701b23457ec4685.jpg"
                                alt="cover"
                            ></img>
                        </div>
                    </div>
                    <div className={style.page}>
                        <h1>소재 6개 그림</h1>
                    </div>
                    <div className={style.page}>
                        <h1>소설1번째</h1>
                    </div>
                    <div className={style.page}>
                        <h1>질문1&그림</h1>
                    </div>
                    <div className={style.page}>
                        <h1>이어가기1</h1>
                    </div>
                    <div className={style.page}>
                        <h1>질문2&그림</h1>
                    </div>
                    <div className={style.page}>
                        <h1>이어가기2</h1>
                    </div>
                    <div className={style.page}>
                        <h1>질문3&그림</h1>
                    </div>
                    <div className={style.page}>
                        <h1>이어가기3</h1>
                    </div>
                    <div className={style.page}>
                        <h1>질문4&그림</h1>
                    </div>
                    <div className={style.page}>
                        <h1>이어가기4</h1>
                    </div>
                    <div className={style.page}>
                        <h1>질문5&그림</h1>
                    </div>
                    <div className={style.page}>
                        <h1>이어가기5</h1>
                    </div>
                    <div className={style.page}>
                        <h1>마무리</h1>
                    </div>
                    <div className={style.page}>
                        <h1>서명</h1>
                    </div>
                    <div className={style.page}>
                        <h1>끝.</h1>
                    </div>
                </div>
            </div>
        </div>
    )
  }