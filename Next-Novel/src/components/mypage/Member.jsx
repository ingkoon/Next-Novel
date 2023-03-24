import style from './Member.module.css'
import React, { useState } from "react"
import Modal from "react-modal"

import Update from "./modal/Update"

export default function Member() {

  const [updateIsOpen, setUpdateIsOpen] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)


  return (
    <div className={style.btn}>
      <button onClick={() => setUpdateIsOpen(true)} className={style.memberbtn}>회원정보 수정</button>
      <button className={style.memberbtn}>회원 탈퇴</button>

      <Modal isOpen={updateIsOpen} onRequestClose={() => setUpdateIsOpen(false)}
        style ={{
          overlay : {

          },
          content : {
            width : '792px',
            height : '526px',
            backgroundColor : '#fffefc'
          }
        }}>
        <Update/>
      </Modal>
      <Modal isOpen={deleteIsOpen}></Modal>
    </div>
  )
}