import style from './Search.module.css'
import Booklist from './Booklist'

import {useEffect, useState} from 'react'
import { getsearch } from "../../api/library"

export default function Search(){

  const [keyword, setKeyword] = useState("")
  const [result, setResult] = useState("  ")
  const [novels, setNovels] = useState([])
  let novellen = 0

  const onChange = (e) => {
    setKeyword(e.target.value)
  }

  async function getsearchlist(keyword) {
    try {
      const data = await getsearch(keyword)
      novellen = data.data.results.length
      setNovels(data.data.results)
    }
    catch(e) {
      console.log(e)
    }
  }

  const search = () => {
    getsearchlist(keyword)
    setResult(keyword)
  }

  const handleOnKeyPress = e =>{
    if(e.key ==='Enter') {
      search()
    }
  }

  useEffect(() => {
    search()
  }, [])

  return (
    <div>
      <div className={style.searchpart}>
        <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} alt='circles_left'></img>

        <div className={style.search}>
          <div>Q. 찾는 소설이 있으신가요?</div>
          <div className={style.form}>
            A.
            <input  type='text' className={style.searchinput} onChange={onChange} onKeyPress={handleOnKeyPress} value={keyword}/>
            <button className={style.searchbtn} onClick={search}> 제출 </button>
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/searchpage.svg'} className={style.searchicon} alt='searchpage'/>
        <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} alt='circles_right'></img>
      </div>
      <div className={style.search_result}>
        "{result}"에 대한 검색결과 :
      </div>

      <Booklist novels={novels}/>
    </div>
  )
}