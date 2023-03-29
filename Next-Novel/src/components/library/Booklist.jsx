import style from './Booklist.module.css'
import Card from '../common/Card'

//api
import { useEffect, useState } from 'react'
import { getnovels } from '../../api/library.js'

export default function Booklist(){

  const [novels, setNovels] = useState()

  let arr = []
  for(let i=0;i<4;i++){
    arr.push(Card)
  }

  // api 통신하기
  async function getnovel() {
    const data = await getnovels()
    console.log(data)
  }

  // api 호출하기
  useEffect(() => {
    getnovel()
  })

  return (
    <div>
      <hr className={style.line}></hr>
      <div className={style.list}>
        {arr.map((Component, index) => (
          <Component key={index}/>
        ))}
      </div>
    </div>
  )
}