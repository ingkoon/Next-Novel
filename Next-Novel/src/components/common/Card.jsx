import style from './Card.module.css'
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext" 

function Card({props}){
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useContext(AuthContext)

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }
  const navigate = useNavigate()

  const navigateToPurchase = (id) => {
    navigate(`/library/${id}/intro`, { state : {id : id}})
  }
  return (
    <div className={style.card} onClick={()=>navigateToPurchase(props.id)}>
      <div className={isHovering ? style.none : style.intro} style={{'backgroundImage':`url(${props.cover_img})`}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment}>
          <div className={style.ment}>
            {props && props.introduction}
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/quote.png'} className={style.quote1} alt='quote1'></img>
        <img src={process.env.PUBLIC_URL+'/img/quote2.png'} className={style.quote2} alt='quote2'></img>
      </div>
      <div className={isHovering ? style.intro : style.none } style={{'backgroundImage':`url(${props.cover_img})`}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment} >
          <div className={style.intro2}>
            <img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} style={{margin:'auto 5px'}} alt='glasses'></img>
            <span style={{margin:'0 5px'}}>{props && props.novel_stats.hit_count}</span>
            <img src={process.env.PUBLIC_URL+'/icon/heart.svg'} style={{margin:'auto 5px'}} alt='heart'></img>
            <span style={{margin:'0 5px'}}>{props && props.novel_stats.like_count}</span>
            <img src={process.env.PUBLIC_URL+'/icon/comment.svg'} style={{margin:'auto 5px'}} alt='comment'></img>
            <span style={{margin:'0 5px'}}>{props && props.novel_stats.like_count}</span>
          </div>
          {user.nickname === props.author ?
            <img src={process.env.PUBLIC_URL+'/icon/trash.svg'} className={style.trash} alt='trash'></img>
            : <></>
          }
        </div>
      </div>
      <div className={style.info}>
        <div className={style.title}>{props && props.title}</div>
        <div className={style.writer}>{props && props.author}</div>
      </div>
      <img src={props && props.cover_img} alt='bookimg'></img>
    </div>
  )
}

export default Card;