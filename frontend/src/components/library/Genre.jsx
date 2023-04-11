import style from './Genre.module.css'

export default function Genre({selectgenre}){
  
  // 장르 버튼 클릭 이벤트
  const click = (e) => {
    const btnlist = document.querySelectorAll('button')
    for(let i=0; i < btnlist.length ; i++) {
      btnlist[i].setAttribute('class',' ')
    }
    e.target.setAttribute('class',style.clicked)

  }

  return (
    <div className={style.genre}>
      <div>| 장르 : </div>
      <button className={style.clicked} onClick={(e)=> {click(e); selectgenre('');}}>전체</button>
      <button onClick={(e)=> {click(e); selectgenre('mystery');}} id='mystery'>추리</button>
      <button onClick={(e)=> {click(e); selectgenre('fantasy')}} >판타지</button>
      <button onClick={(e)=> {click(e); selectgenre('sf')}}> SF</button>
      <button onClick={(e)=> {click(e); selectgenre('romance')}}>로맨스</button>
      <button onClick={(e)=> {click(e); selectgenre('free')}}>자유</button>
    </div>
  )
}