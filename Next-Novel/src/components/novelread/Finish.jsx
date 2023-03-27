import style from './Finish.module.css';

export default function Finish() {
  return (
    <div className={style.wrapper}>
        <button className={style.toPreview}>
            책 소개로
        </button>
        <div>
            한줄평 남기기
        </div>
        <input type="text" className={style.review} />
        <button className={style.send}>
            전송
        </button>
    </div>
  )
}