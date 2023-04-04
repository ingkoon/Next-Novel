import style from './InfoCard.module.css';
import { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import { novelall } from '../../api/novelread'

export default function InfoCard() {

  const location = useLocation()
  const id = location.state.id
  const [novelid, setNovelid] = useState(id)
  const [novelinfo, setNovelinfo] = useState("")
  const [create, setCreate] = useState("")

  async function nvinfo() {
    try {
      const data = await novelall(novelid)
      console.log(data)
      setNovelinfo(data.data)

      const year = data.data.novel.created_at.substring(0, 4)
      const month = data.data.novel.created_at.substring(5, 7)
      const date = data.data.novel.created_at.substring(8, 10)
      setCreate(year+"."+month+"."+date)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(()=> {
    console.log(id)
    setNovelid(id)
    nvinfo()
  }, [novelid])

  return (
    <div className={style.wrapper}>
        <div className={style.bar}></div>
        <div className={style.content}>

            <img src={process.env.PUBLIC_URL+'/img/NN_LOGO_text.svg'} className={style.logo} alt='NN_LOGO_text'></img>
            <div className={style.header}>&gt;_ 도서열람증</div>
            <div className={style.title}>{novelinfo && novelinfo.novel.title}</div>
            <div className={style.sub}>
                제작자 :
                <div>&nbsp;{novelinfo && novelinfo.novel.author}</div>
            </div>
            <div className={style.sub}>
                출간일 :
                <div>&nbsp;{novelinfo && create}</div>
            </div>
            <div className={style.sub}>
                장르 :
                <div>&nbsp;{novelinfo && novelinfo.novel.genre}</div>
            </div>
            <img src={process.env.PUBLIC_URL+'/img/barcode.svg'} className={style.barcode} alt='barcode'></img>
        </div>
    </div>
  )
}