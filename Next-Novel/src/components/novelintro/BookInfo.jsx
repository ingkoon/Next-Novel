import style from './BookInfo.module.css'

export default function BookInfo(){
    return (
      <div>
        <div className={style.info}>
            <div className={style.wrap}>
                <div className={style.title}>
                    「책제목입니다」
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
                <div className={style.etc2}>
                    <img src={process.env.PUBLIC_URL+'/icon/glasses_black.svg'} className={style.icons} alt='glasses_black'></img>
                    <div className={style.nums}>180</div>
                </div>
                <div className={style.etc2}>
                    <img src={process.env.PUBLIC_URL+'/icon/heart_outline.svg'} className={style.icons} alt='heart_outline'></img>
                    <div className={style.nums}>39</div>
                </div>
                <div className={style.etc2}>
                    <img src={process.env.PUBLIC_URL+'/icon/comment_outline.svg'} className={style.icons} alt='comment_outline'></img>
                    <div className={style.nums}>3</div>
                </div>
            </div>
        </div>
      </div>
    )
  }