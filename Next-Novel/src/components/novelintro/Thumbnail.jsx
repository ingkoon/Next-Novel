import style from './Thumbnail.module.css'

export default function Thumbnail(){
    return (
      <div>
        <div className={style.introBanner}>
            <div className={style.bookCircle}>
            </div>
            <div className={style.bannerGrad}>
            </div>
            <div className={style.quote}>
                <img src={process.env.PUBLIC_URL+'/icon/quote1_black.svg'} className={style.newcard_quote1} alt='quote1_black'></img>
                <div className={style.quotetext}>
                    <span>이거슨 한줄 소개글입니다. 최대 50자까지 쓸 수 있죠. 이거슨 한줄 소개글입니다.</span>
                </div>
                <img src={process.env.PUBLIC_URL+'/icon/quote2_black.svg'} className={style.newcard_quote2} alt='quote2_black'></img>
            </div>
        </div>
      </div>
    )
  }