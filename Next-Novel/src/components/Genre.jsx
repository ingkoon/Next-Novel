import './Genre.module.css'

export default function Genre(){
  
  // 장르 버튼 클릭 이벤트
  const click = (e) => {
    const btnlist = document.querySelectorAll('button')
    for(let i=0; i < btnlist.length ; i++) {
      btnlist[i].setAttribute('class',' ')
    }
    e.target.setAttribute('class','clicked')
  }

  return (
    <div className='genre'>
      <div>| 장르 : </div>
      <button className='clicked' onClick={click}>전체</button>
      <button onClick={click} >추리</button>
      <button onClick={click} >판타지</button>
      <button onClick={click}> SF</button>
      <button onClick={click}>로맨스</button>
      <button onClick={click}>자유</button>
    </div>
  )
}