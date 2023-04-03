import style from './Book.module.css';
import Materials from './Materials.jsx';
import Qna from './Qna.jsx';
import { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { novelall } from '../../api/novelread'
import { useNavigate } from 'react-router-dom';


export default function Book(){

    const location = useLocation();
    const id = location.state.id;
    const [novelid, setNovelid] = useState(id);
    const [novelinfo, setNovelinfo] = useState("");
    const [novelContent, setNovelContent] = useState("");
    const [lastPage, setLastPage] = useState("");

    const [create, setCreate] = useState("");
  
    async function nvinfo() {
      try {
        const data = await novelall(novelid)
        console.log(data)
        setNovelinfo(data.data)
        setNovelContent(data.data.novel_detail.slice(0, data.data.novel_detail.length-1));
        setLastPage(data.data.novel_detail.slice(data.data.novel_detail.length-1, data.data.novel_detail.length));

        const year = data.data.novel.created_at.substring(0, 4)
        const month = data.data.novel.created_at.substring(5, 7)
        const date = data.data.novel.created_at.substring(8, 10)
        setCreate(year+"."+month+"."+date)
      } catch (e) {
        console.log(e)
      }
    };

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
        };

        setNovelid(id)
        nvinfo()
      }, [novelid]);
  

    return (
        <div className={style.back}>
            {novelinfo && <div className={style.book}>
                {novelinfo && <div className={style.pages}>
                    <div className={style.page}>
                        <div className={style.cover}>
                            <div className={style.coverimg}>
                                <img
                                    src={novelinfo && process.env.REACT_APP_IMAGE_API + novelinfo.novel.cover_img}
                                    alt="cover"
                                ></img>
                            </div>
                            <div className={style.bookfooter}>
                                <span className={style.ex}>
                                 "&nbsp; 
                                </span>
                                <span>
                                    {novelinfo && novelinfo.novel.introduction}
                                </span>
                                <span className={style.ex}>
                                    &nbsp;"
                                </span>
                            </div>
                            <div className={style.fbar}></div>
                        </div>
                    </div>

                    {novelContent.map((item, index) => {

                        return <>
                        
                            <div className={style.page}>
                                {index === 0 && <Materials mat={item} />}
                                {index > 0 && <Qna qna={item} />}
                            </div>
                            <div className={style.page}>
                                <h1>{item.content}</h1>
                            </div>
                        
                        </>
                    })}

                    <div className={style.page}>
                        <h1>{lastPage[0].content}</h1>
                    </div>
                    <div className={style.page}>
                        <div className={style.ogcover}>
                            <img
                                src={novelinfo && process.env.REACT_APP_IMAGE_API + novelinfo.novel.original_cover_img}
                                alt="ogcover"
                            ></img>
                            <div className={style.tmi}>
                                P.S. 책 표지는 위 그림으로 만들어졌습니다.
                            </div>
                        </div>
                    </div>
                    <div className={style.page}>
                        <div className={style.lastpg}>
                            <div className={style.eng}>
                                THE &nbsp;&nbsp;END.
                            </div>
                            <div className={style.theend}>
                                끝
                            </div>
                            <div className={style.ebar}></div>
                        </div>
                    </div>
                    <div className={style.fin}>
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
                                <h2>소감평 작성</h2>
                            </Link>
                        </div>
                    </div>
                </div>}
            </div>}
        </div>
    )
  }