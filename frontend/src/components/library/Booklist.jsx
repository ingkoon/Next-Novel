import style from "./Booklist.module.css"
import Card from "../common/Card"
import Genre from "./Genre";

//api
import { useEffect, useState } from "react"
import { getnovels, getgenre } from "../../api/library"

export default function Booklist() {

  const [novels, setNovels] = useState([])
  let novellen = 0
  const [arr, setArr] = useState()

  // api 호출하기
  useEffect(() => {
    async function getnovel() {
      try {
  
        const data = await getnovels()
        console.log(data)
        novellen = data.data.results.length
        setNovels(data.data.results)
        
        let tmp = []
        for(let i=0;i<novellen;i++){
          tmp = [...tmp]
          tmp.push(Card)
        }
        setArr(tmp)
      }
      catch(e) {
        console.log(e)
      }
    }
    
    getnovel()

  },[])
  
  const selectgenre = (data) => {
    getgenreres(data)
  }

  async function getgenreres(genre){
    const data = await getgenre(genre)
    try {
      novellen = data.data.results.length
      setNovels(data.data.results)
      
      let tmp = []
      for(let i=0;i<novellen;i++){
        tmp = [...tmp]
        tmp.push(Card)
      }
      setArr(tmp)
    }
    catch(e) {
      console.log(e)
    }
  }
  
  
  return (
    <div>
      <Genre selectgenre={selectgenre}/>
      <hr className={style.line} />
      <div className={style.list}>
        {arr?.map((Component, index) => (
          <Component
            key={index}
            props = {novels && novels[index]}
          />
        ))}
      </div>
    </div>
  )
}
