import style from './Book3d.module.css'

export default function Book3d(){
    return (
      <div className={style.wrapper}>
        <div className={style.book}>
            <div className={style.page1}>
                <img src={process.env.PUBLIC_URL+'/img/tmp/girl2.jpg'} className={style.cover} alt='girl2'></img>
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