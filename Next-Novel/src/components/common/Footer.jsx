import style from './Footer.module.css';

export default function Footer(){

    return(
        <div className={style.block}>
            <div className={style.toppart}>
                <div className={style.twrap}>
                    <img src={process.env.PUBLIC_URL+'/img/landing/N.svg'} className={style.topN} alt='NN_LOGO_text'></img>
                    <img src={process.env.PUBLIC_URL+'/img/landing/El.svg'} className={style.topE} alt='NN_LOGO_text'></img>
                    <img src={process.env.PUBLIC_URL+'/img/landing/X.svg'} className={style.topX} alt='NN_LOGO_text'></img>
                    <img src={process.env.PUBLIC_URL+'/img/landing/T.svg'} className={style.topT} alt='NN_LOGO_text'></img>
                </div>
            </div>
            <div className={style.botpart}>
                <div className={style.bwrap}>
                    <img src={process.env.PUBLIC_URL+'/img/landing/N.svg'} className={style.botN} alt='NN_LOGO_text'></img>
                    <img src={process.env.PUBLIC_URL+'/img/landing/O.svg'} className={style.botO} alt='NN_LOGO_text'></img>
                    <img src={process.env.PUBLIC_URL+'/img/landing/V.svg'} className={style.botV} alt='NN_LOGO_text'></img>
                    <img src={process.env.PUBLIC_URL+'/img/landing/E.svg'} className={style.botE} alt='NN_LOGO_text'></img>
                    <img src={process.env.PUBLIC_URL+'/img/landing/L.svg'} className={style.botL} alt='NN_LOGO_text'></img>
                </div>
            </div>
            <div className={style.text1}>
                NEXT_NOVEL : 넥스트노벨<br />
                <span className={style.gray}>&copy; All Rights Reserved</span><br/><br /> 
                <span>AI 소설 웹서비스&nbsp;&nbsp;</span><span className={style.gray}>[인공지능 : 영상]</span><br />
                
                Team 6G&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BE:&nbsp;<span className={style.gray}>이정범 이명규 강은진</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FE:&nbsp;<span className={style.gray}>김수빈 소지현 서철원</span>
            </div>
        </div>
    )
}