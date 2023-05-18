import style from "./Bubble.module.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-modal";
import Delete from "../mypage/modal/Delete";

type BubbleContent = {
  commentId: number;
  content: string;
  createdAt: string;
  memberId: number;
  nickName: string;
  novelId: number;
  profileImg: string;
};

interface BubbleProps {
  props: BubbleContent;
  novelId: number;
  updatelist: () => void;
}

export default function Bubble({ props, novelId, updatelist }: BubbleProps) {
  const [create, setCreate] = useState("");
  const { user } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  // 로컬 멤버아이디
  const localValue: string | null = localStorage.getItem("memberId");
  const localMemberId: number = localValue !== null ? parseInt(localValue) : 0;

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
  //댓글에선refreshList불필요
  const refreshList = () => {
    return;
  };

  return (
    <>
      <div className={style.bubble}>
        <div className={style.bubbleLeft}>
          <img
            src={
              props && process.env.REACT_APP_MEMBER_IMAGE_API + props.profileImg
            }
            className={style.profilepic}
            alt="profileimage"
          />
          <div className={style.profilename}>
            <span>{props && props.nickName}</span>
          </div>
        </div>
        <div className={style.bar} />
        <div className={style.bubbleRight}>
          <div className={style.ment}>
            <span>{props && props.content}</span>
          </div>
          <div className={style.date}>
            <span>{props && create}</span>
          </div>

          {localMemberId === props.memberId && (
            <div className={style.del} onClick={deletecomment}>
              <img
                src={process.env.PUBLIC_URL + "/icon/trash_black.svg"}
                className={style.trash}
                alt="trash"
              />
            </div>
          )}
        </div>
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
            height: "380px",
            backgroundColor: "#fffefc",
            margin: "auto",
          },
        }}
      >
        <Delete
          type="comment"
          novelId={props.novelId}
          closemodal={closemodal}
          commentId={props.commentId}
          refreshList={refreshList}
        />
      </Modal>
    </>
  );
}
