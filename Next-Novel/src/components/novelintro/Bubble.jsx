import style from './Bubble.module.css';
import {useEffect, useState, useContext } from 'react'
import {AuthContext} from "../../context/AuthContext"
import Modal from "react-modal"
import Delete from '../mypage/modal/Delete'

export default function Bubble({props, id, updatelist}){

    const [create, setCreate] = useState("")
    const { user } = useContext(AuthContext)
    const [modal, setModal] = useState(false)

    useEffect(()=> {
        const year = props.created_at.substring(0, 4)
        const month = props.created_at.substring(5, 7)
        const date = props.created_at.substring(8, 10)
        setCreate(year+"."+month+"."+date)
    })

    const deletecomment = () => {
        setModal(true)
    }
    const closemodal = () => {
        updatelist()
        setModal(false)
    }

    return(
        <>
        <div className={style.bubble}>
            <img src={props && props.author.profile_image} className={style.profilepic} alt='profileimage'></img>
            <div className={style.profilename}>
                <span>{props && props.author.nickname}</span>
            </div>
            <div className={style.bar}></div>
            <div className={style.ment}>
                <span>{props && props.content}</span>
            </div>
            <div className={style.date}>
                <span>{props && create}</span>
            </div>
            
            { localStorage.getItem('nickname') === props.author.nickname 
                ? <div className={style.del} onClick={deletecomment}>
                    <img src={process.env.PUBLIC_URL+'/icon/trash_black.svg'} className={style.trash} alt='trash'></img>
                </div>
                :
                <></>
            }
        </div>

        <Modal isOpen={modal} onRequestClose={() => setModal(false)}
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
            <Delete type="comment" id={id} closemodal={closemodal} comid={props.id}/>
        </Modal>
        </>
    )
}