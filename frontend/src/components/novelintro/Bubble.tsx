import style from "./Bubble.module.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-modal";
import Delete from "../mypage/modal/Delete";

type BubbleContent = {
  id: number;
  content: string;
  createdAt: string;
  nickName: string;
  novelId: number;
  profileImg: string;
};

interface BubbleProps {
  props: BubbleContent;
  id: number;
  updatelist: () => void;
}

export default function Bubble({ props, id, updatelist }: BubbleProps) {
  const [create, setCreate] = useState("");
  const { user } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const year = props.createdAt.substring(0, 4);
    const month = props.createdAt.substring(5, 7);
    const date = props.createdAt.substring(8, 10);
    setCreate(year + "." + month + "." + date);
  });

  const deletecomment = () => {
    setModal(true);
  };
  const closemodal = () => {
    updatelist();
    setModal(false);
  };

  return (
    <>
      <div className={style.bubble}>
        <img
          src={props && process.env.REACT_APP_IMAGE_API + props.profileImg}
          className={style.profilepic}
          alt="profileimage"
        />
        <div className={style.profilename}>
          <span>{props && props.nickName}</span>
        </div>
        <div className={style.bar} />
        <div className={style.ment}>
          <span>{props && props.content}</span>
        </div>
        <div className={style.date}>
          <span>{props && create}</span>
        </div>

        {localStorage.getItem("nickname") === props.nickName ? (
          <div className={style.del} onClick={deletecomment}>
            <img
              src={process.env.PUBLIC_URL + "/icon/trash_black.svg"}
              className={style.trash}
              alt="trash"
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <Modal
        isOpen={modal}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            zIndex: "100",
          },
          content: {
            width: "792px",
            height: "360px",
            backgroundColor: "#fffefc",
            margin: "auto",
          },
        }}
      >
        <Delete
          type="comment"
          id={id}
          closemodal={closemodal}
          comid={props.id}
        />
      </Modal>
    </>
  );
}
