import style from './Block4.module.css';

export default function Block4(){

    return(
        <div className={style.block}>
           <div className={style.title}>이용가이드</div>

           <div className={style.container}>
                <div className={style.steps}>
                    <div className={style.vs}>
                        <img src={process.env.PUBLIC_URL+'/icon/logo.svg'} className={style.sicon} alt='vector_step1'></img>
                        <div className={style.num}>
                            1
                        </div>
                    </div>
                </div>
                <div className={style.steps}>
                    <div className={style.vs}>
                        <img src={process.env.PUBLIC_URL+'/icon/logo.svg'} className={style.sicon} alt='vector_step1'></img>
                        <div className={style.num}>
                            2
                        </div>
                    </div>
                </div>
                <div className={style.steps}>
                    <div className={style.vs}>
                        <img src={process.env.PUBLIC_URL+'/icon/logo.svg'} className={style.sicon} alt='vector_step1'></img>
                        <div className={style.num}>
                            3
                        </div>
                    </div>
                </div>
                <div className={style.steps}>
                    <div className={style.vs}>
                        <img src={process.env.PUBLIC_URL+'/icon/logo.svg'} className={style.sicon} alt='vector_step1'></img>
                        <div className={style.num}>
                            4
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}