import style from "./NewCard.module.css";
import { useNavigate } from "react-router-dom";
import Book3d from "../common/Book3d";

type newcardInfo = {
  novelId: number;
  coverImg: string;
  title: string;
  nickName: string;
  introduction: string;
  likeCount: number;
  commentCount: number;
};

interface newcardProps {
  props: newcardInfo;
}

export default function NewCard({ props }: newcardProps) {
  const navigate = useNavigate();

  const navigateToIntro = (novelId: number) => {
    navigate(`/library/${novelId}/intro`, { state: { novelId: novelId } });
  };

  return (
    <div
      className={style.newcard}
      onClick={() => navigateToIntro(props.novelId)}
    >
      <div className={style.img}>
        <Book3d type="" img={props.coverImg} />
        {/* <img src={props.cover_img} alt='cover_img'></img> */}
      </div>
      <div className={style.strip}>
        <div className={style.newcard_line} />
      </div>
      <div className={style.newcard_infopart}>
        <div style={{ height: "50px", marginTop: "20px" }}>
          <div className={style.newcard_new}>추천</div>
        </div>

        <div className={style.newcard_intro}>
          <div className={style.newcard_ment}>
            <div>{props.introduction}</div>
          </div>
          <img
            src={process.env.PUBLIC_URL + "/icon/rainbow.svg"}
            className={style.rainbowbg}
            alt="rainbow"
          />
          <img
            src={process.env.PUBLIC_URL + "/icon/quote1_black.svg"}
            className={style.newcard_quote1}
            alt="quote1_black"
          />
          <img
            src={process.env.PUBLIC_URL + "/icon/quote2_black.svg"}
            className={style.newcard_quote2}
            alt="quote2_black"
          />
        </div>

        <div className={style.newcard_info}>
          <div className={style.newcard_title}>{props.title}</div>
          <div className={style.newcard_writer}>{props.nickName}</div>
          <div className={style.newcard_last}>
            {/* <div className={style.newcard_date}>
              출간일 : {props.createdAt.slice(0, 10)}
            </div> */}
            <div style={{ display: "flex", marginRight: "10px" }}>
              <img
                src={process.env.PUBLIC_URL + "/icon/heart_black.svg"}
                style={{ margin: "auto 5px" }}
                alt="heart_black"
              />
              <div className={style.newcard_heart}>{props.likeCount}</div>
              <img
                src={process.env.PUBLIC_URL + "/icon/comment_black.svg"}
                style={{ margin: "auto 5px" }}
                alt="comment_black"
              />
              <div className={style.newcard_comment}>{props.commentCount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
