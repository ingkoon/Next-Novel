import style from './Card.module.css'
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
    <div className={style.card}>
      <div className={isHovering ? style.none : style.intro} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment}>
          <div className={style.ment}>
            이거슨 한 줄 소개글 입니다. 최대 50자까지 쓸수 있죠
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/quote.png'} className={style.quote1} alt='quote1'></img>
        <img src={process.env.PUBLIC_URL+'/img/quote2.png'} className={style.quote2} alt='quote2'></img>
      </div>
      <div className={isHovering ? style.intro : style.none } onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment}>
          <div className={style.intro2}>
            <img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} style={{margin:'auto 5px'}} alt='glasses'></img>
            <span style={{margin:'0 5px'}}>110</span>
            <img src={process.env.PUBLIC_URL+'/icon/heart.svg'} style={{margin:'auto 5px'}} alt='heart'></img>
            <span style={{margin:'0 5px'}}>23</span>
            <img src={process.env.PUBLIC_URL+'/icon/comment.svg'} style={{margin:'auto 5px'}} alt='comment'></img>
            <span style={{margin:'0 5px'}}>11</span>
          </div>
          <img src={process.env.PUBLIC_URL+'/icon/trash.svg'} className={style.trash} alt='trash'></img>
        </div>
      </div>
      <div className={style.info}>
        <div className={style.title}>책 제목</div>
        <div className={style.writer}>저자</div>
      </div>
      <img src={process.env.PUBLIC_URL +'/img/just me.png'} alt='just me'></img>
    </div>
  )
}

export default Card;