import './Card.module.css'
import React, { useState } from 'react';

function Card(){
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return (
    <div className="card">
      <div className={isHovering ? 'none' : 'intro'} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className='introment'>
          <div className='ment'>
            이거슨 한 줄 소개글 입니다. 최대 50자까지 쓸수 있죠
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/quote.png'} className='quote1' ></img>
        <img src={process.env.PUBLIC_URL+'/img/quote2.png'} className='quote2' ></img>
      </div>
      <div className={isHovering ? 'intro' : 'none'} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className='introment'>
          <div className='intro2'>
            <img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} style={{margin:'auto 5px'}}></img>
            <span style={{margin:'0 5px'}}>110</span>
            <img src={process.env.PUBLIC_URL+'/icon/heart.svg'} style={{margin:'auto 5px'}}></img>
            <span style={{margin:'0 5px'}}>23</span>
            <img src={process.env.PUBLIC_URL+'/icon/comment.svg'} style={{margin:'auto 5px'}}></img>
            <span style={{margin:'0 5px'}}>11</span>
          </div>
          <img src={process.env.PUBLIC_URL+'/icon/trash.svg'} className='trash'></img>
        </div>
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