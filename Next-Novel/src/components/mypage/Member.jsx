import style from './Member.module.css'
import React, { useEffect, useState } from "react"
import Modal from "react-modal"

import Update from "./modal/Update"
import Unregi from "./modal/Unregi"

export default function Member({updatemember}) {

  const [updateIsOpen, setUpdateIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)

  const closemodal = () => {
    setUpdateIsOpen(false)
    setDeleteIsOpen(false)
    updatemember()
  }


  return (
    <div className={style.btn}>
      <button onClick={() => setUpdateIsOpen(true)} className={style.memberbtn}>회원정보 수정</button>
      <button onClick={() => setDeleteIsOpen(true)} className={style.memberbtn}>회원 탈퇴</button>

      <Modal className={style.updatemodal} isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
        style ={{
          overlay : {

          },
          content : {
            width : '792px',
            height : '526px',
            backgroundColor : '#fffefc',
            margin: 'auto',
          }
        }}>
        <Update closemodal={closemodal}/>
      </Modal>

      <Modal isOpen={deleteIsOpen} onRequestClose={() => setDeleteIsOpen(false)}
        style ={{
          overlay : {

          },
          content : {
            width : '792px',
            height : '360px',
            backgroundColor : '#fffefc',
            margin: 'auto',
          }
        }}>
        <Unregi closemodal={closemodal}/>
      </Modal>
    </div>
  )
}