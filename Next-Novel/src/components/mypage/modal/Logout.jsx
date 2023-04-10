import style from './Delete.module.css'
import { useNavigate } from 'react-router-dom'

export default function Delete({closemodal}) {

  const navigate = useNavigate()

  const navigateToHome = () => {
    navigate(`/`)
  }

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("nickname")
    closemodal()
    goTop()
    navigateToHome()
  }

  const deletemem = () => {
    logout()
  }
  
  return (
    <div className={style.deletemodal}>

      <div className={style.close} onClick={()=> closemodal()}>x</div>
      <div className={style.title}>
        &gt;_LOGOUT
      </div>

      <div className={style.subtitle}> "NEXT NOVEL"에서 로그아웃하시겠니까?</div>

      <div className={style.button}>
        <button onClick={()=> closemodal()}>취소</button>
        <button onClick={()=> deletemem()}>확인</button>
      </div>

      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} alt='circles_left'></img>
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} alt='circles_right'></img>
    </div>
  )
}