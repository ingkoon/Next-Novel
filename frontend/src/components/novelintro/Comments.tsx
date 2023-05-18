import style from "./Comments.module.css";
import Bubble from "./Bubble";
import { NovelInfoType } from "../../types/novel";

type CommentsProps = {
  novelInfo: NovelInfoType;
  getIntroAsync: () => void;
};

export default function Comments({ novelInfo, getIntroAsync }: CommentsProps) {
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
        {novelInfo.comments.length === 0 ? (
          <div> 등록된 감상평이 없습니다. </div>
        ) : (
          <div className={style.bub_container}>
            {novelInfo.comments.map((comment, index) => (
              <div className={style.bub} key={index}>
                <Bubble
                  updatelist={getIntroAsync}
                  key={index}
                  props={comment}
                  novelId={comment.novelId}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
