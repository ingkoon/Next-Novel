import style from "./Comments.module.css";
import Bubble from "./Bubble";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getcomment } from "../../api/novel";

export default function Comments() {
  const location = useLocation();
  const novelId = location.state.novelId;
  const [novelid, setNovelid] = useState(novelId);
  const [commentlist, setCommentlist] = useState([]);

  //로컬 멤버아이디
  const localValue: string | null = localStorage.getItem("memberId");
  const localMemberId: number = localValue !== null ? parseInt(localValue) : 0;

  async function comment() {
    try {
      const data = await getcomment(novelid, localMemberId);
      console.log(data);
      setCommentlist(data.data.comments);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setNovelid(novelId);
    console.log("!!!!코멘트노벨아이디:" + novelId);
    // comment(novelid); before code
    comment();
  }, [novelid]);

  const updatelist = () => {
    comment();
  };

  return (
    <div>
      <div className={style.review}>
        <img
          src={process.env.PUBLIC_URL + "/icon/comments2.svg"}
          className={style.icons}
          alt="comments2"
        />
        <div className={style.gamsang}>
          <span>감상평</span>
        </div>
        <div className={style.line} />
      </div>
      <div className={style.commentbox}>
        {commentlist.length === 0 ? (
          <div> 등록된 감상평이 없습니다. </div>
        ) : (
          <div className={style.bub_container}>
            {commentlist.map((comment, index) => (
              <div className={style.bub}>
                <Bubble
                  updatelist={updatelist}
                  key={index}
                  props={comment}
                  novelId={novelid}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
