import './Card.css'

function Card(){
  return (
    <div className="card">
      <div className='intro'>
        <div className='introment'>
          <div className='ment'>
            이거슨 한 줄 소개글 입니다. 최대 50자까지 쓸수 있죠
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/quote.png'} className='quote1' ></img>
        <img src={process.env.PUBLIC_URL+'/img/quote2.png'} className='quote2' ></img>
      </div>
      <div className='info'>
        <div className='title'>책 제목</div>
        <div className='writer'>저자</div>
      </div>
      <img src={process.env.PUBLIC_URL +'/img/just me.png'}></img>
    </div>
  )
}

export default Card;