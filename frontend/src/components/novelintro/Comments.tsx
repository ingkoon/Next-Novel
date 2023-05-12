import style from "./Comments.module.css";
import Bubble from "./Bubble";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getcomment } from "../../api/novel";

export default function Comments() {
  const location = useLocation();
  const id = location.state.id;
  const [novelid, setNovelid] = useState(id);
  const [commentlist, setCommentlist] = useState([]);

  async function comment() {
    try {
      const data = await getcomment(novelid, localStorage.getItem("nickName"));
      console.log(data);
      setCommentlist(data.data.comments);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setNovelid(id);
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
          <div>
            {commentlist.map((comment, index) => (
              <Bubble
                updatelist={updatelist}
                key={index}
                props={comment}
                id={novelid}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
