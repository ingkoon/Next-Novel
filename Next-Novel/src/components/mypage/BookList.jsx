import { useEffect } from 'react'
import Card from '../common/Card'
import style from './BookList.module.css'

import {useState} from "react"
import {getmynovel, getlikenovel} from "../../api/user"

export default function BookList({type, setMylen, setLikelen}){

  const [noveldata, setNoveldata] = useState([])
  const [arr, setArr] = useState()
  let novellen = 0
  

  async function mynovels(){
    try {
      const data = await getmynovel()
      console.log(data)
      setNoveldata(data.data)
      novellen = data.data.length
      let tmp = []
      for(let i=0;i<novellen;i++){
        tmp = [...tmp]
        tmp.push(Card)
      }
      setArr(tmp)
      setMylen(novellen)
    }
    catch(e){
      console.log(e)
    }
  }

  async function likenovels(){
    try {
      const data = await getlikenovel()
      setNoveldata(data.data)
      console.log(data)
      let novellen = data.data.length
      let tmp = []
      for(let i=0;i<novellen;i++){
        tmp = [...tmp]
        tmp.push(Card)
      }
      setArr(tmp)
      setLikelen(novellen)
    }
    catch(e) {console.log(e)}
  }
  useEffect(() => {
    if(type === 'my'){
      mynovels()
    }
    else if (type === 'like') {
      likenovels()
    }
  }, [novellen])

  const updatelist = () => {
    mynovels()
  }

  return (
    <div>
      <div className={style.cardlist}>
        {arr?.map((Component, index) => (
          <Component updatelist={updatelist} props={noveldata[index]} key={index} className={style.cardcompo}/>
        ))}
      </div>
    </div>
  )
}
