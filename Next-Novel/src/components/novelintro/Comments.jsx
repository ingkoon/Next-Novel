import style from './Comments.module.css'
import Bubble from "./Bubble";

import { useLocation } from "react-router-dom"
import { useState, useEffect} from 'react'
import { getcomment } from '../../api/novel'

export default function Comments(){

  const location = useLocation()
  const id = location.state.id
  const [novelid, setNovelid] = useState(id)
  const [commentlist, setCommentlist] = useState([])
  let commentlen = 0
  const [arr, setArr] = useState([])
  
  async function comment() {
    try {
      const data = await getcomment(novelid)
      commentlen = data.data.length
      console.log(data)
      setCommentlist(data.data)

      let tmp =[]
      for(let i=0;i<commentlen ; i++) {
        tmp = [...tmp]
        tmp.push(Bubble)
      }
      setArr(tmp)
      console.log(arr)
    }
    catch(e) {
      console.log(e)
    }
  }
  
  useEffect(()=> {
    setNovelid(id)
    comment(novelid)
  }, [novelid])

  const updatelist = () => {
    comment()
  }

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
          {arr == '' ? 
            <div> 등록된 감상평이 없습니다. </div>
          :
            <div>
              {arr.map((Component, index)=> (
                <Component updatelist={updatelist} key={index} props={commentlist[index]} id={novelid}/>
              ))}
            </div>
          }
          
      </div>
    </div>
  )
}