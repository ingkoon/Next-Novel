import style from "./Booklist.module.css"
import Card from "../common/Card"

//api
import { useEffect, useState } from "react"

export default function Booklist({novels}) {

  const [arr, setArr] = useState([])

  let novellen = novels.length
  console.log(novellen)
  useEffect(() => {
    let tmp = []
    for(let i=0; i < novellen; i++){
      tmp = [...tmp]
      tmp.push(Card)
    }
    setArr(tmp)
  }, [novels])

  return (
    <div>
      <hr className={style.line} />
      <div className={style.list}>
        {arr?.map((Component, index) => (
          <Component
            key={index}
            props = {novels[index]}
          />
        ))}
      </div>
    </div>
  )
}
