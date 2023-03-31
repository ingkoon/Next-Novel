import style from './Bubble.module.css';
import {useEffect, useState, useContext } from 'react'
import {AuthContext} from "../../context/AuthContext" 

export default function Bubble({props}){

    const [create, setCreate] = useState("")
    const { user } = useContext(AuthContext)
    
    useEffect(()=> {
        const year = props.created_at.substring(0, 4)
        const month = props.created_at.substring(5, 7)
        const date = props.created_at.substring(8, 10)
        setCreate(year+"."+month+"."+date)
    })

    function deletecomment(){
        const id = props.id
        
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
            { user.nickname === props.author.nickname 
                ? <div className={style.del} onClick={deletecomment}>
                    <img src={process.env.PUBLIC_URL+'/icon/trash_black.svg'} className={style.trash} alt='trash'></img>
                </div>
                :
                <></>
            }
        </div>
        </>
    )
}