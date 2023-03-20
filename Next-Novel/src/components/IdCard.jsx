import style from './IdCard.module.css'

export default function IdCard(){
  return (
    <div>
      <div className={style.cardtop}>
        <div className={style.cardtopcircle}></div>
        <div className={style.cardtopclip}></div>
        <div className={style.cardtopbase}></div>
      </div>
      <div className={style.cardmiddle}>
        <div className={style.cardmiddlebase}>
          {/* <div className='line'></div> */}
        </div>
      </div>
    </div>
  )
}