import style from './Comments.module.css'
import Bubble from "./Bubble";

export default function Comments(){
    return (
      <div>
        <div className={style.review}>
            <img src={process.env.PUBLIC_URL+'/icon/comments2.svg'} className={style.icons} alt='comments2'></img>
            <div className={style.gamsang}>
                <span>감상평</span>
            </div>
            <div className={style.line}></div>
        </div>
        <div className={style.commentbox}>
            
            <Bubble />
            <Bubble />
            
        </div>
      </div>
    )
  }