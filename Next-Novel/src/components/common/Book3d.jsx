import style from './Book3d.module.css'

export default function Book3d({img}){
    return (
      <div className={style.wrapper}>
        <div className={style.book}>
            <div className={style.page1}>
                <img src={img} className={style.cover} alt='coverimage'></img>
            </div>
            <div className={style.page2}>
                222
            </div>
            <div className={style.page3}>
                333
            </div>
            <div className={style.page4}>
                444
            </div>
            <div className={style.edge}></div>
        </div>
      </div>
    );
}