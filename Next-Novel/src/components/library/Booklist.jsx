import style from "./Booklist.module.css"
import Card from "../common/Card"
import Genre from "./Genre";

//api
import { useEffect, useState } from "react"
import { getnovels } from "../../api/library.js"
import { useLoaderData } from "react-router"

export default function Booklist() {
  
  // api 통신하기
  async function getnovel() {
    const data = await getnovels()
    try {
      console.log(data)
      setNovels(data.data.results)
    }
    catch(e) {
      console.log(e)
    }
  }

  const [novels, setNovels] = useState([])
  let novellen = 0
  const [arr, setArr] = useState()

  // api 호출하기
  useEffect(() => {
    async function getnovel() {
      const data = await getnovels()
      try {
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

  return (
    <div>
      <Genre/>
      <hr className={style.line} />
      <div className={style.list}>
        {arr?.map((Component, index) => (
          <Component
            key={index}
            title={novels[index].title}
            intro={novels[index].introduction}
            author={novels[index].author}
            img={novels[index].cover_img}
            view={
              novels && novels[index].novels_stats
                ? novels[index].novels_stats.hit_count
                : "0"
            }
            likes={
              novels && novels[index].novels_stats
                ? novels[index].novels_stats.hit_count
                : "0"
            }
            comments={
              novels && novels[index].novels_stats
                ? novels[index].novels_stats.hit_count
                : "0"
            }
          />
        ))}
      </div>
    </div>
  )
}
