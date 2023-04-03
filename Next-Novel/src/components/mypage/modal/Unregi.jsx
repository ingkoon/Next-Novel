import style from './Delete.module.css'

import { deleteuser } from '../../../api/user'

export default function Delete({closemodal}) {

  async function regiuser() {
    try {
      const data = await deleteuser()
      console.log(data)
    }
    catch(e) {
      console.log(e)
    }
  }

  const deletemem = () => {
    regiuser()
  }
  
  return (
    <div className={style.deletemodal}>

      <div className={style.close} onClick={()=> closemodal()}>x</div>
      <div className={style.title}>
        &gt;_GOODBYE
      </div>

      <div className={style.subtitle}> "NEXT NOVEL"에서 떠나시겠습니까?</div>

      <div className={style.button}>
        <button onClick={()=> closemodal()}>취소</button>
        <button onClick={()=> deletemem()}>확인</button>
      </div>

      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} alt='circles_left'></img>
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} alt='circles_right'></img>
    </div>
  )
}