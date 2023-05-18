import style from "./BookInfo.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getintro, postliked, deleteliked } from "../../api/novel";
import { NovelInfoType } from "../../types/novel";

type BookInfoProps = {
  novelInfo: NovelInfoType;
  getIntroAsync: () => void;
};

export default function BookInfo({novelInfo, getIntroAsync}:BookInfoProps) {
  
  const [create, setCreate] = useState("");
  const memberId = localStorage.getItem("memberId")
    ? Number(localStorage.getItem("memberId"))
    : 0;

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function liked() {
    if (novelInfo?.liked) {
      try {
        const data = await deleteliked(novelInfo.novelId, memberId);
        console.log(data);
        getIntroAsync();
      } catch (e) {
        console.log(e);
      }
    }else{
      try {
        const data = await postliked(novelInfo.novelId, memberId);
        console.log(data);
        getIntroAsync();
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    goTop();
    const year = novelInfo.createdAt.substring(0, 4);
    const month = novelInfo.createdAt.substring(5, 7);
    const date = novelInfo.createdAt.substring(8, 10);
    setCreate(year + "." + month + "." + date);
  }, []);

  const navigate = useNavigate();

  const navigateToRead = (novelId: number) => {
    navigate(`/library/${novelId}/read`, { state: { novelId: novelId } });
  };

  return (
    <div>
      <div className={style.link} onClick={() => navigateToRead(novelInfo.novelId)}>
        <span className={style.front}>
          <img
            src={process.env.PUBLIC_URL + "/icon/glasses.svg"}
            className={style.bicon}
            alt="glasses_black"
          />
        </span>
        <span className={style.center} />
        <span className={style.back}>열람</span>
      </div>
      <div className={style.blur} />
      <div className={style.undertext}>
        <span>{novelInfo && novelInfo.title}</span>
      </div>
      <div className={style.info}>
        <div className={style.wrap}>
          <div className={style.title}>
            <span>「{novelInfo && novelInfo.title}」</span>
          </div>
          <div className={style.subtitle}>
            <div className={style.line} />
            <div className={style.etc1box}>
              <div className={style.etc1}>제작자</div>
              <div className={style.etc1}>출간일</div>
              <div className={style.etc1}>장르</div>
            </div>
            <div className={style.etc2box}>
              <div className={style.etc2}>
                {novelInfo && novelInfo.nickName}
              </div>
              <div className={style.etc2}>{novelInfo && create}</div>
              <div className={style.etc2}>{novelInfo && novelInfo.korGenre}</div>
            </div>
          </div>
        </div>
        <div className={style.hlc}>
          <div className={style.etc3}>
            <img
              src={process.env.PUBLIC_URL + "/icon/glasses_black.svg"}
              className={style.icons}
              alt="glasses_black"
            />
            <div className={style.nums}>{novelInfo && novelInfo.hitCount}</div>
          </div>
          <div className={style.etc3}>
            <div className={style.likebtn} onClick={liked}>
              {novelInfo?.liked ? (
                <img
                  src={process.env.PUBLIC_URL + "/icon/black_heart.svg"}
                  className={style.like}
                  alt="heart"
                />
              ) : (
                <img
                  src={process.env.PUBLIC_URL + "/icon/heart_outline.svg"}
                  className={style.like}
                  alt="heart"
                />
              )}
            </div>
            <div className={style.likenums}>
              {novelInfo && novelInfo.likeCount}
            </div>
          </div>
          <div className={style.etc3}>
            <img
              src={process.env.PUBLIC_URL + "/icon/comment_outline.svg"}
              className={style.icons}
              alt="comment_outline"
            />
            <div className={style.nums}>
              {novelInfo && novelInfo.commentCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
