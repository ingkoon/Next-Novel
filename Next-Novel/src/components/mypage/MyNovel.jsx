import style from './mynovel.module.css'
import style2 from '../library/Booklist.module.css'
import BookList from './BookList'
import Gototop from '../common/GoToTop'

export default function mynovel(){
  return (
    <div>
      <hr className={style2.line}></hr>

      <div className={style.titlebar}>
        <div className={style.mynoveltitle}>
          <span className={style.step}>1</span>
          <img src={process.env.PUBLIC_URL + "/icon/logo.svg"} className={style.logo} alt='logo'></img>
        </div>

        <div className={style.title}>제작한 소설</div>

        <button>2</button>
        <div className={style.triangle}>
          <img src={process.env.PUBLIC_URL + '/icon/triangle.svg'}/>
        </div>
      </div>

      <div className={style.booklist}>
        <BookList/>
      </div>


      <hr className={style2.line}></hr>

      <div className={style.titlebar}>
        <div className={style.mynoveltitle}>
          <span className={style.step}>2</span>
          <img src={process.env.PUBLIC_URL + "/icon/logo.svg"} className={style.logo} alt='logo'></img>
        </div>

        <div className={style.title}>좋아요 누른 소설</div>

        <button>2</button>
        <div className={style.triangle}>
          <img src={process.env.PUBLIC_URL + '/icon/triangle.svg'}/>
        </div>
      </div>

      <div className={style.booklist}>
        <BookList/>
      </div>

      <Gototop/>

    </div>
  )
}