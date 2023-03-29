import style from './Bubble.module.css';

export default function Bubble(){
    return(
        <>
        <div className={style.bubble}>
            <img src={process.env.PUBLIC_URL+'/img/tmp/girl2.jpg'} className={style.profilepic} alt='girl2'></img>
            <div className={style.profilename}>
                <span>닉네임이올시다</span>
            </div>
            <div className={style.bar}></div>
            <div className={style.ment}>
                <span>이거슨열글자입니다용이거슨열글자입니다용이거슨열글자입니다용이거슨열글자입니다용이거슨열글자입니다용</span>
            </div>
            <div className={style.date}>
                <span>2023.03.22</span>
            </div>
            <div className={style.del}>
                <img src={process.env.PUBLIC_URL+'/icon/trash_black.svg'} className={style.trash} alt='trash'></img>
            </div>
        </div>
        </>
    )
}