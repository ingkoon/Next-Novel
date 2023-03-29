import style from './BookInfo.module.css'
import { Link } from "react-router-dom"

export default function BookInfo(){
    return (
      <div>
        <Link to="/library/read" className={style.link}>
              <span className={style.front}><img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} className={style.bicon} alt='glasses_black'></img></span>
              <span className={style.center}></span>
              <span className={style.back}>열람</span>
        </Link>
        <div className={style.blur}>
        </div>
        <div className={style.undertext}>
            <span>책제목입니다</span>
        </div>
        <div className={style.info}>
            <div className={style.wrap}>
                <div className={style.title}>
                    <span>「책제목입니다」</span>
                </div>
                <div className={style.subtitle}>
                    <div className={style.line}></div>
                    <div>
                        <div className={style.etc1}>제작자</div>
                        <div className={style.etc1}>출간일</div>
                    </div>
                    <div>
                        <div className={style.etc2}>이정범팀장님</div>
                        <div className={style.etc2}>2023.03.21</div>
                    </div>
                </div>
            </div>
            <div className={style.hlc}>
                <div className={style.etc3}>
                    <img src={process.env.PUBLIC_URL+'/icon/glasses_black.svg'} className={style.icons} alt='glasses_black'></img>
                    <div className={style.nums}>180</div>
                </div>
                <div className={style.etc3}>
                    <div className={style.likebtn}>
                        <img src={process.env.PUBLIC_URL+'/icon/heart_outline.svg'} className={style.like} alt='heart_outline'></img>
                    </div>
                    <div className={style.likenums}>65</div>
                </div>
                <div className={style.etc3}>
                    <img src={process.env.PUBLIC_URL+'/icon/comment_outline.svg'} className={style.icons} alt='comment_outline'></img>
                    <div className={style.nums}>3</div>
                </div>
            </div>
        </div>
      </div>
    )
  }