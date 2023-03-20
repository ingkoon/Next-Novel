import style from './NewBookList.module.css'
import NewCard from "../components/NewCard";

export default function NewBookList() {
  return (
    <div className={style.newbooklist}>
      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} ></img>
      <div className={style.newbook_before}>
        &lt;
      </div>
      <NewCard/>
      <div className={style.newbook_next}>
        &gt;
      </div>
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} ></img>
    </div>
  )
}