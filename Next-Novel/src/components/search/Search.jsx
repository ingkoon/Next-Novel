import style from './Search.module.css'

export default function Search(){
  return (
    <div>
      <div className={style.searchpart}>
        <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} alt='circles_left'></img>

        <div className={style.search}>
          <div>Q. 찾는 소설이 있으신가요?</div>
          <div className={style.form}>
            A.
            <input type='text' className={style.searchinput}/>
            <button className={style.searchbtn}> 제출 </button>
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/searchpage.svg'} className={style.searchicon} alt='searchpage'/>
        <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} alt='circles_right'></img>
      </div>
      <div className={style.search_result}>
        "@@@"에 대한 검색결과 :
      </div>
    </div>
  )
}