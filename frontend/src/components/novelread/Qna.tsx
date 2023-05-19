import style from "./Qna.module.css";

type qnainfo = {
  novelId: number;
  content: string;
  query: string;
  image: string;
  caption: string;
};
interface QnaProps {
  qna: qnainfo;
  index: number;
}

export default function Qna({ qna, index }: QnaProps) {
  return (
    <div className={style.wrapper}>
      <div className={style.what}>
        <div className={style.toppart}>
          <div className={style.qnum}>Q{index}.</div>
          <div className={style.icon}>
            <img
              src={process.env.PUBLIC_URL + "/icon/quote1_black.svg"}
              className={style.newcard_quote1}
              alt="quote1_black"
            />
          </div>
          <div className={`${style.quest} ${style.qna_text}`}>{qna.query}</div>
          <div className={style.icon}>
            <img
              src={process.env.PUBLIC_URL + "/icon/quote2_black.svg"}
              className={style.newcard_quote2}
              alt="quote2_black"
            />
          </div>
        </div>
        <div className={style.checking}>
          <div className={style.pic}>
            <div className={style.inpic}>
              <img
                src={process.env.REACT_APP_IMAGE_API + qna.image}
                alt="qnaimage"
              />
            </div>
          </div>

          <div className={style.caption}>{qna.caption}</div>
          {/* <div className={style.caption_parent}>
                    <div className={style.caption}>{qna.images[0].caption}</div>
                </div> */}
        </div>
      </div>
    </div>
  );
}
