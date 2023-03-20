import style from './NewCard.module.css'

export default function NewCard(){
  return (
    <div className={style.newcard}>
      <div className={style.img}>
        <img src={process.env.PUBLIC_URL+'/img/tmp/tmpimg2.png'}></img>
      </div>
      <div className={style.strip}>
        <div className={style.newcard_line}></div>
      </div>
      <div className={style.newcard_infopart}>
        <div style={{height:'50px', marginTop:'20px'}}>
          <div className={style.newcard_new}>
            NEW
          </div>
        </div>

        <div className={style.newcard_intro}>
          <div className={style.newcard_ment}>
            취미는 기타, 본업은 코딩 한 사내의 좌충우돌 개발자 생존기
          </div>
          <img src={process.env.PUBLIC_URL+'/icon/quote1_black.svg'} className={style.newcard_quote1} ></img>
          <img src={process.env.PUBLIC_URL+'/icon/quote2_black.svg'} className={style.newcard_quote2} ></img>
        </div>

        <div className={style.newcard_info}>
          <div className={style.newcard_title}>그냥, 취미해!</div>
          <div className={style.newcard_writer}>찰스</div>
          <div className={style.newcard_last}>
            <div className={style.newcard_date}>
              출간일 : 2023.03.08
            </div>
            <div style={{display:'flex', marginRight:'10px'}}>
              <img src={process.env.PUBLIC_URL+'/icon/heart_black.svg'} style={{margin:'auto 5px'}}></img>
              <div className={style.newcard_heart}>23</div>
              <img src={process.env.PUBLIC_URL+'/icon/comment_black.svg'} style={{margin:'auto 5px'}}></img>
              <div className={style.newcard_comment}>11</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}