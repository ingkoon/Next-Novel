import style from './Qna.module.css';

export default function Qna() {
  return (
    <div className={style.wrapper}>
        <div className={style.what}>
            <div>
                <div className={style.qnum}>
                    Q1.
                </div>
                <div className={style.icon}>
                    <img src={process.env.PUBLIC_URL+'/icon/quote1_black.svg'} className={style.newcard_quote1} alt='quote1_black'></img>
                </div>
                <div className={style.quest}>
                    ?질문이들어가는곳?
                </div>
                <div className={style.icon}>
                    <img src={process.env.PUBLIC_URL+'/icon/quote2_black.svg'} className={style.newcard_quote2} alt='quote2_black'></img>
                </div>
            </div>
            <div>   
                <div className={style.pic}></div>
            </div>
        </div>
    </div>
  )
}