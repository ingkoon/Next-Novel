import style from './IdCard.module.css'
import Member from './Member'

export default function IdCard(){
  return (
    <div className={style.mypagewhole}>
      <div className={style.mypage}>

        <div className={style.left}>
          <div className={style.pic}>
            <div className={style.pictxt}>profile_pic</div>
            <div className={style.linehor}></div>
          </div>
          <div className={`${style.circle} ${style.one}`}></div>
          <div className={style.pic}>
            <div>reg_date</div>
            <div className={style.line}></div>
          </div>
          <div className={`${style.circle} ${style.two}`}></div>
        </div>


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
                  <img src={process.env.PUBLIC_URL+'img/tmp/girl2.jpg'} alt='girl2'/>
                  <div>
                    <img src={process.env.PUBLIC_URL + 'icon/logo_color.svg'} alt='logo_color' />
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
                    <img src={process.env.PUBLIC_URL+'img/tmp/girl2.jpg'} alt='girl2'/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className={style.right}>
          <div className={style.circlegroup}>
            <div></div>
            <div className={`${style.circle} ${style.three}`}></div>
            <div className={`${style.circle} ${style.four}`}></div>
            <div className={`${style.circle} ${style.five}`}></div>
            <div className={`${style.circle} ${style.six}`}></div>
            <div></div>
          </div>

          <div className={style.circlegroup3} style={{width:'165px'}}>
            <div></div>
            <div className={style.diag}></div>
            <div className={style.diag}></div>
            <div className={style.diag}></div>
            <div className={style.diag2}></div>
          </div>

          <div className={style.circlegroup2} >
            {/* <div></div> */}
            <div>
              <div >division</div>
              <div className={style.horline}></div>
            </div>
            <div>
              <div>authority</div>
              <div className={style.horline}></div>
            </div>
            <div>
              <div>user_name</div>
              <div className={style.horline}></div>
            </div>
            <div>
              <div>nationality</div>
              <div className={style.horline}></div>
            </div>
          </div>
        </div>

        <img src={process.env.PUBLIC_URL+'/img/circles_right_top.svg'} className={style.circles} alt='circles'></img>
      </div>

      <Member/>
    </div>
  )
}