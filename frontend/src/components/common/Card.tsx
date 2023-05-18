import style from "./Card.module.css";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deletenovel } from "../../api/novel";
import Modal from "react-modal";
import Delete from "../mypage/modal/Delete";

type cardinfo = {
  novelId: number;
  title: string;
  introduction: string;
  nickName: string;
  memberId: number;
  coverImg: string;
  hitCount: number;
  commentCount: number;
  likeCount: number;
  score: number | null;
};

type CardProps = {
  props: cardinfo;
  refreshList: () => void;
};

function Card({ props, refreshList }: CardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { score } = props;
  const { user } = useContext(AuthContext);

  //로컬 멤버아이디
  const localValue: string | null = localStorage.getItem('memberId');
  const localMemberId: number = localValue !== null ? parseInt(localValue) : 0;

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const navigate = useNavigate();

  const navigateToIntro = (novelId: number) => {
    navigate(`/library/${novelId}/intro`, { state: { novelId: novelId } });
  };

  const [modal, setModal] = useState(false);

  const delnovel = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    setModal(true);
  };

  const closemodal = () => {
    setModal(false);
  };
  return (
    <>
      <div
        className={style.card}
        onClick={(e) => navigateToIntro(props.novelId)}
      >
        <div
          className={isHovering ? style.none : style.intro}
          style={{
            backgroundImage: `url(${props &&
              process.env.REACT_APP_IMAGE_API + props.coverImg})`,
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className={style.introment}>
            <div className={style.ment}>{props && props.introduction}</div>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/img/quote.png"}
            className={style.quote1}
            alt="quote1"
          />
          <img
            src={process.env.PUBLIC_URL + "/img/quote2.png"}
            className={style.quote2}
            alt="quote2"
          />
        </div>
        <div
          className={isHovering ? style.intro : style.none}
          style={{
            backgroundImage: `url(${props &&
              process.env.REACT_APP_IMAGE_API + props.coverImg})`,
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <div className={style.introment}>
            <div className={style.intro2}>
              <img
                src={process.env.PUBLIC_URL + "/icon/glasses.svg"}
                style={{ margin: "auto 5px" }}
                alt="glasses"
              />
              <span style={{ margin: "0 5px" }}>{props && props.hitCount}</span>
              <img
                src={process.env.PUBLIC_URL + "/icon/heart.svg"}
                style={{ margin: "auto 5px" }}
                alt="heart"
              />
              <span style={{ margin: "0 5px" }}>
                {props && props.likeCount}
              </span>
              <img
                src={process.env.PUBLIC_URL + "/icon/comment.svg"}
                style={{ margin: "auto 5px" }}
                alt="comment"
              />
              <span style={{ margin: "0 5px" }}>
                {props && props.commentCount}
              </span>
            </div>
            {localMemberId === props.memberId ? (
              <img
                onClick={delnovel}
                src={process.env.PUBLIC_URL + "/icon/trash.svg"}
                className={style.trash}
                alt="trash"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={style.info}>
          <div className={style.title}>{props && props.title}</div>
          <div className={style.writer}>{props && props.nickName}</div>
          {score !== null && (
            <div className={style.score}>
              <br />
              유사도: <span>{props && props.score?.toFixed(3)}</span>
            </div>
          )}
        </div>
        <img
          src={props && process.env.REACT_APP_IMAGE_API + props.coverImg}
          className={style.bookimg}
          alt="bookimg"
        />
      </div>
      <Modal
        isOpen={modal}
        closeTimeoutMS={200}
        onRequestClose={() => setModal(false)}
        style={{
          overlay: {
            zIndex: "100",
          },
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
        <Delete
          type="novel"
          novelId={props && props.novelId}
          closemodal={closemodal}
          commentId={0} //Card니까 그냥 commentId 0으로주기
          refreshList={refreshList}
        />
      </Modal>
    </>
  );
}

export default Card;
