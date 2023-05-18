import style from "./Member.module.css";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Update from "./modal/Update";
import Logout from "./modal/Logout";

type MemberProps = {
  updatemember: () => void;
};

export default function Member({ updatemember }: MemberProps) {
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);

  const closemodal = () => {
    //업데이트 하고 닫으니까 ID카드에서도 새로운 값 갱신
    setUpdateIsOpen(false);
    setDeleteIsOpen(false);
    updatemember();
  };

  return (
    <div className={style.btn}>
      <button onClick={() => setUpdateIsOpen(true)} className={style.memberbtn}>
        회원정보 수정
      </button>
      <button onClick={() => setDeleteIsOpen(true)} className={style.memberbtn}>
        로그아웃
      </button>

      <Modal
        className={style.updatemodal}
        closeTimeoutMS={200}
        isOpen={updateIsOpen}
        onRequestClose={() => setUpdateIsOpen(false)}
        style={{
          overlay: {},
          content: {
            width: "75%",
            maxWidth: "792px",
            height: "75%",
            backgroundColor: "#fffefc",
            margin: "auto",
            inset: 0,
          },
        }}
      >
        <Update closemodal={closemodal} />
      </Modal>

      <Modal
        isOpen={deleteIsOpen}
        closeTimeoutMS={200}
        onRequestClose={() => setDeleteIsOpen(false)}
        style={{
          overlay: {},
          content: {
            width: "75%",
            maxWidth: "792px",
            height: "380px",
            backgroundColor: "#fffefc",
            margin: "auto",
            inset: 0,
          },
        }}
      >
        <Logout closemodal={closemodal} />
      </Modal>
    </div>
  );
}
