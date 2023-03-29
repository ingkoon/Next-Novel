import { useEffect } from 'react';
import Materials from './Materials.jsx';
import Qna from './Qna.jsx';
import style from './Book.module.css';
import { Link } from "react-router-dom"

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
                            <div className={style.coverimg}>
                                <img
                                    src="https://i.pinimg.com/564x/f6/13/14/f61314f3ff9441fc1701b23457ec4685.jpg"
                                    alt="cover"
                                ></img>
                            </div>
                            <div className={style.bookfooter}>
                                "한줄소개글이 들어갑니다"
                                Dovemayo_wild
                            </div>
                            <div className={style.fbar}></div>
                        </div>
                    </div>
                    <div className={style.page}>
                        <Materials />
                    </div>
                    <div className={style.page}>
                        <h1>소설1번째</h1>
                    </div>
                    <div className={style.page}>
                        <Qna />
                    </div>
                    <div className={style.page}>
                        <h1>이어가기1</h1>
                    </div>
                    <div className={style.page}>
                        <Qna />
                    </div>
                    <div className={style.page}>
                        <h1>이어가기2</h1>
                    </div>
                    <div className={style.page}>
                        <Qna />
                    </div>
                    <div className={style.page}>
                        <h1>이어가기3</h1>
                    </div>
                    <div className={style.page}>
                        <Qna />
                    </div>
                    <div className={style.page}>
                        <h1>이어가기4</h1>
                    </div>
                    <div className={style.page}>
                        <Qna />
                    </div>
                    <div className={style.page}>
                        <h1>이어가기5</h1>
                    </div>
                    <div className={style.page}>
                        <h1>마무리</h1>
                    </div>
                    <div className={style.page}>
                        <h1>원본표지</h1>
                    </div>
                    <div className={style.page}>
                        <div className={style.end}>
                            <div className={style.eng}>
                                THE END.
                            </div>
                            <div className={style.theend}>
                                끝
                            </div>
                            <div className={style.ebar}></div>
                        </div>
                    </div>
                    <div className={style.temp}>
                        <div className={style.block}>
                            <img src={process.env.PUBLIC_URL+'/icon/glasses_black.svg'} className={style.icon} alt='glasses_black'></img>
                            <Link to="/library/intro" className={style.link}>
                                <h2>돌아가기</h2>
                            </Link>
                        </div>
                        <div className={style.blank}></div>
                        <div className={style.block}>
                            <img src={process.env.PUBLIC_URL+'/icon/comments2.svg'} className={style.icon} alt='comment_black'></img>
                            <input type="text" className={style.comment} placeholder="          어떠셨나요?"/>
                            <div className={style.sbar}></div>
                            <Link to="/library/intro" className={style.link}>
                                <h2>소감평작성</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }