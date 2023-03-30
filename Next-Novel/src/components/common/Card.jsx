import style from './Card.module.css'
import React, { useState } from 'react';

function Card({props}){
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  return (
    <div className={style.card}>
      <div className={isHovering ? style.none : style.intro} style={ isHovering ? {'backgroundImage':`url(${props.cover_img})`}: {}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment}>
          <div className={style.ment}>
            {props.introduction}
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/quote.png'} className={style.quote1} alt='quote1'></img>
        <img src={process.env.PUBLIC_URL+'/img/quote2.png'} className={style.quote2} alt='quote2'></img>
      </div>
      <div className={isHovering ? style.intro : style.none } style={ isHovering ? {'backgroundImage':`url(${props.img})`}: {}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment}>
          <div className={style.intro2}>
            <img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} style={{margin:'auto 5px'}} alt='glasses'></img>
            <span style={{margin:'0 5px'}}>{props.novel_stats.hit_count}</span>
            <img src={process.env.PUBLIC_URL+'/icon/heart.svg'} style={{margin:'auto 5px'}} alt='heart'></img>
            <span style={{margin:'0 5px'}}>{props.novel_stats.like_count}</span>
            <img src={process.env.PUBLIC_URL+'/icon/comment.svg'} style={{margin:'auto 5px'}} alt='comment'></img>
            <span style={{margin:'0 5px'}}>{props.novel_stats.like_count}</span>
          </div>
          <img src={process.env.PUBLIC_URL+'/icon/trash.svg'} className={style.trash} alt='trash'></img>
        </div>
      </div>
      <div className={style.info}>
        <div className={style.title}>{props.title}</div>
        <div className={style.writer}>{props.author}</div>
      </div>
      <img src={props.cover_img} alt='bookimg'></img>
    </div>
  )
}

export default Card;