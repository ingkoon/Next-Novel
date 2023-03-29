import style from './Card.module.css'
import React, { useState } from 'react';

function Card({title, intro, author, img, view, likes, comments}){
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
            {intro}
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/quote.png'} className={style.quote1} alt='quote1'></img>
        <img src={process.env.PUBLIC_URL+'/img/quote2.png'} className={style.quote2} alt='quote2'></img>
      </div>
      <div className={isHovering ? style.intro : style.none } onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment}>
          <div className={style.intro2}>
            <img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} style={{margin:'auto 5px'}} alt='glasses'></img>
            <span style={{margin:'0 5px'}}>{view}</span>
            <img src={process.env.PUBLIC_URL+'/icon/heart.svg'} style={{margin:'auto 5px'}} alt='heart'></img>
            <span style={{margin:'0 5px'}}>{likes}</span>
            <img src={process.env.PUBLIC_URL+'/icon/comment.svg'} style={{margin:'auto 5px'}} alt='comment'></img>
            <span style={{margin:'0 5px'}}>{comments}</span>
          </div>
          <img src={process.env.PUBLIC_URL+'/icon/trash.svg'} className={style.trash} alt='trash'></img>
        </div>
      </div>
      <div className={style.info}>
        <div className={style.title}>{title}</div>
        <div className={style.writer}>{author}</div>
      </div>
      <img src={img} alt='bookimg'></img>
    </div>
  )
}

export default Card;