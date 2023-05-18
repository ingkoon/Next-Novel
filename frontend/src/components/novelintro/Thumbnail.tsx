import style from "./Thumbnail.module.css";
import Book3d from "../common/Book3d";

type ThumbnailProps = {
  novelInfo: NovelInfoType;
};
type NovelInfoType = {
  coverImg: string;
  introduction: string;
  novelId: number;
  title: string;
  createdAt: string;
  korGenre: string;
  nickName: string;
  hitCount: number;
  commentCount: number;
  likeCount: number;
  liked: boolean;
};

export default function Thumbnail({ novelInfo }: ThumbnailProps) {
  return (
    <div>
      <div className={style.introBanner}>
        {novelInfo && (
          <div className={style.bookCircle}>
            <Book3d type="thumbnail" img={novelInfo.coverImg} />
          </div>
        )}
        <div className={style.bannerGrad} />
        <div className={style.quote}>
          <img
            src={process.env.PUBLIC_URL + "/icon/quote1_black.svg"}
            className={style.newcard_quote1}
            alt="quote1_black"
          />
          <div className={style.quotetext}>
            {novelInfo && novelInfo.introduction}
          </div>
          <img
            src={process.env.PUBLIC_URL + "/icon/quote2_black.svg"}
            className={style.newcard_quote2}
            alt="quote2_black"
          />
        </div>
      </div>
    </div>
  );
}
