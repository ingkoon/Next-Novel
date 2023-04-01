import style from './BookInfo.module.css'
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'

import { getintro } from '../../api/novel'

export default function BookInfo(){

    const location = useLocation()
    const id = location.state.id
    const [novelid, setNovelid] = useState(id)
    const [novelinfo, setNovelinfo] = useState("")
    const [create, setCreate] = useState("")
    
    const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(()=> {
        goTop()
        setNovelid(id)
        async function intro() {
            try {
                const data = await getintro(novelid)
                console.log(data)
                setNovelinfo(data.data)

                const year = data.data.created_at.substring(0, 4)
                const month = data.data.created_at.substring(5, 7)
                const date = data.data.created_at.substring(8, 10)
                setCreate(year+"."+month+"."+date)
            }
            catch(e) {
                console.log(e)
            }
        }
        intro(novelid)
    }, [novelid])
    return (
      <div>
        <Link to="/library/read" className={style.link}>
              <span className={style.front}><img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} className={style.bicon} alt='glasses_black'></img></span>
              <span className={style.center}></span>
              <span className={style.back}>열람</span>
        </Link>
        <div className={style.blur}>
        </div>
        <div className={style.undertext}>
            <span>{novelinfo && novelinfo.title}</span>
        </div>
        <div className={style.info}>
            <div className={style.wrap}>
                <div className={style.title}>
                    <span>「{novelinfo && novelinfo.title}」</span>
                </div>
                <div className={style.subtitle}>
                    <div className={style.line}></div>
                    <div>
                        <div className={style.etc1}>제작자</div>
                        <div className={style.etc1}>출간일</div>
                    </div>
                    <div>
                        <div className={style.etc2}>{novelinfo && novelinfo.author}</div>
                        <div className={style.etc2}>{novelinfo && create}</div>
                    </div>
                </div>
            </div>
            <div className={style.hlc}>
                <div className={style.etc3}>
                    <img src={process.env.PUBLIC_URL+'/icon/glasses_black.svg'} className={style.icons} alt='glasses_black'></img>
                    <div className={style.nums}>{novelinfo && novelinfo.novel_stats.hit_count}</div>
                </div>
                <div className={style.etc3}>
                    <div className={style.likebtn}>
                        <img src={process.env.PUBLIC_URL+'/icon/heart_outline.svg'} className={style.like} alt='heart_outline'></img>
                    </div>
                    <div className={style.likenums}>{novelinfo && novelinfo.novel_stats.like_count}</div>
                </div>
                <div className={style.etc3}>
                    <img src={process.env.PUBLIC_URL+'/icon/comment_outline.svg'} className={style.icons} alt='comment_outline'></img>
                    <div className={style.nums}>{novelinfo && novelinfo.novel_stats.comment_count}</div>
                </div>
            </div>
        </div>
      </div>
    )
  }