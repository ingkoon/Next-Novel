import style from './InfoCard.module.css';

export default function InfoCard() {
  return (
    <div className={style.wrapper}>
        <div className={style.bar}></div>
        <div className={style.content}>

            <img src={process.env.PUBLIC_URL+'/img/NN_LOGO_text.svg'} className={style.logo} alt='NN_LOGO_text'></img>
            <div className={style.header}>&gt;_ 도서열람증</div>
            <div className={style.title}>오늘나는내일의너를만난다</div>
            <div className={style.sub}>
                제작자 :
                <div>&nbsp;닉네임최대열여섯글자밖에안되는데</div>
            </div>
            <div className={style.sub}>
                출간일 :
                <div>&nbsp;2023.03.27</div>
            </div>
            <img src={process.env.PUBLIC_URL+'/img/barcode.svg'} className={style.barcode} alt='barcode'></img>
        </div>
    </div>
  )
}