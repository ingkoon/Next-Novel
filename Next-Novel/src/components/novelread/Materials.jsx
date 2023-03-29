import style from './Materials.module.css';

export default function Materials() {
  return (
    <div className={style.wrapper}>
        <div className={style.what}>
            <div className={style.col}>
                <div className={style.pic}></div>
                <div className={style.pic}></div>
            </div>
            <div className={style.col}>
                <div className={style.pic}></div>
                <div className={style.pic}></div>
            </div>
            <div className={style.col}>
                <div className={style.pic}></div>
                <div className={style.pic}></div>
            </div>
        </div>
    </div>
  )
}