import style from "./BookInfo.module.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getintro, postliked } from "../../api/novel";

type NInfo = {
  id: number;
  title: string;
  createdAt: string;
  // introduction: string;
  // engGenre: string;
  // korGenre: string;
  nickName: string;
  hitCount: number;
  commentCount: number;
  likeCount: number;
  liked: boolean;
};

export default function BookInfo() {
  const location = useLocation();
  const id = location.state.id;
  const [novelid, setNovelid] = useState(id);
  const [novelinfo, setNovelinfo] = useState<NInfo>();
  const [create, setCreate] = useState("");

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function intro() {
    try {
      const data = await getintro(novelid, localStorage.getItem('nickName'));
      console.log(data);
      console.log("닉네임불러오기:"+localStorage.getItem('nickName'));
      setNovelinfo(data.data);

      const year = data.data.createdAt.substring(0, 4);
      const month = data.data.createdAt.substring(5, 7);
      const date = data.data.createdAt.substring(8, 10);
      setCreate(year + "." + month + "." + date);
    } catch (e) {
      console.log(e);
    }
  }

  async function liked() {
    try {
      const data = await postliked(novelid);
      console.log(data);
      intro();
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    goTop();
    setNovelid(id);
    intro();
  }, []);

  const navigate = useNavigate();

  const navigateToRead = (id: number) => {
    navigate(`/library/${id}/read`, { state: { id: id } });
  };

  return (
    <div>
      <div className={style.link} onClick={() => navigateToRead(novelid)}>
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
        <span>{novelinfo && novelinfo.title}</span>
      </div>
      <div className={style.info}>
        <div className={style.wrap}>
          <div className={style.title}>
            <span>「{novelinfo && novelinfo.title}」</span>
          </div>
          <div className={style.subtitle}>
            <div className={style.line} />
            <div>
              <div className={style.etc1}>제작자</div>
              <div className={style.etc1}>출간일</div>
            </div>
            <div>
              <div className={style.etc2}>
                {novelinfo && novelinfo.nickName}
              </div>
              <div className={style.etc2}>{novelinfo && create}</div>
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
            <div className={style.nums}>{novelinfo && novelinfo.hitCount}</div>
          </div>
          <div className={style.etc3}>
            <div className={style.likebtn} onClick={liked}>
              {novelinfo?.liked ? (
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
              {novelinfo && novelinfo.likeCount}
            </div>
          </div>
          <div className={style.etc3}>
            <img
              src={process.env.PUBLIC_URL + "/icon/comment_outline.svg"}
              className={style.icons}
              alt="comment_outline"
            />
            <div className={style.nums}>
              {novelinfo && novelinfo.commentCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
