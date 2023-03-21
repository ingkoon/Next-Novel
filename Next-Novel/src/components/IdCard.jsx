import style from './IdCard.module.css'

export default function IdCard(){
  return (
    <div className={style.idcard}>
      <div className={style.cardtop}>
        <div className={style.cardtopcircle}></div>
        <div className={style.cardtopclip}></div>
        <div className={style.cardtopbase}></div>
      </div>
      <div className={style.cardmiddle}>
        <div className={style.cardmiddlebase}>
          <div className={style.info_top}>
            <div className={style.info_nn}>Next Novel Lab</div>
            <div className={style.info_img}>
              <img src={process.env.PUBLIC_URL+'img/tmp/girl2.jpg'}/>
              <div>
                <img src={process.env.PUBLIC_URL + 'icon/logo_color.svg'}/>
              </div>
            </div>
          </div>

          <div className={style.info_bottom}>
            <div className={style.info_title}>CREATOR</div>
            <div className={style.info_bottom2}>
              <div className={style.info_sub}>
                <div className={style.info_name}>테스트닉네임1</div>
                <div className={style.info_date}>S/N 20230308.14.24.32</div>
              </div>
              <div className={style.info_nation}>
                <img src={process.env.PUBLIC_URL+'img/tmp/girl2.jpg'}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}