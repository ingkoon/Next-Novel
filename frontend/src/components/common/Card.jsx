import style from './Card.module.css'
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../../context/AuthContext"
import { deletenovel } from "../../api/novel"
import Modal from "react-modal"
import Delete from '../mypage/modal/Delete'

function Card({props, updatelist}){
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

  const [ modal , setModal ] = useState(false)
 
  const delnovel = (e) => {
    e.stopPropagation()
    setModal(true)
  }

  const closemodal = () => {
    updatelist()
    setModal(false)
  }
  return (
    <>
    <div className={style.card} onClick={(e)=>navigateToPurchase(props.id)}>
      <div className={isHovering ? style.none : style.intro} style={{'backgroundImage':`url(${props && props.cover_img})`}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment}>
          <div className={style.ment}>
            {props && props.introduction}
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/quote.png'} className={style.quote1} alt='quote1'></img>
        <img src={process.env.PUBLIC_URL+'/img/quote2.png'} className={style.quote2} alt='quote2'></img>
      </div>
      <div className={isHovering ? style.intro : style.none } style={{'backgroundImage':`url(${props && props.cover_img})`}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <div className={style.introment} >
          <div className={style.intro2}>
            <img src={process.env.PUBLIC_URL+'/icon/glasses.svg'} style={{margin:'auto 5px'}} alt='glasses'></img>
            <span style={{margin:'0 5px'}}>{props && props.novel_stats.hit_count}</span>
            <img src={process.env.PUBLIC_URL+'/icon/heart.svg'} style={{margin:'auto 5px'}} alt='heart'></img>
            <span style={{margin:'0 5px'}}>{props && props.novel_stats.like_count}</span>
            <img src={process.env.PUBLIC_URL+'/icon/comment.svg'} style={{margin:'auto 5px'}} alt='comment'></img>
            <span style={{margin:'0 5px'}}>{props && props.novel_stats.comment_count}</span>
          </div>
          {props && user.nickname === props.author ?
            <img onClick={delnovel} src={process.env.PUBLIC_URL+'/icon/trash.svg'} className={style.trash} alt='trash'></img>
            : <></>
          }
        </div>
      </div>
      <div className={style.info}>
        <div className={style.title}>{props && props.title}</div>
        <div className={style.writer}>{props && props.author}</div>
      </div>
      <img src={props && props.cover_img} className={style.bookimg} alt='bookimg'></img>

    </div>
    <Modal isOpen={modal} closeTimeoutMS={200} onRequestClose={() => setModal(false)}
      style ={{
        overlay : {
          zIndex : '100'
        },
        content : {
          width : '792px',
          height : '360px',
          backgroundColor : '#fffefc',
          margin: 'auto',
        }
      }}>
      <Delete type="novel" id={props && props.id} closemodal={closemodal}/>
    </Modal>
    </>


  )
}

export default Card;