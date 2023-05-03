import style from "./Qna.module.css";

type imageinfo = {
  caption: string;
  // created_at: string;
  // id: number;
  image: string;
  // novel_content: number;
};
type qnainfo = {
  chosen_query: string;
  // content: string;
  // id: number;
  images: imageinfo[];
  // query1: string;
  // query2: string;
  // query3: string;
  // step: number;
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
          <div className={`${style.quest} ${style.qna_text}`}>
            {qna.chosen_query}
          </div>
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
              <img src={qna.images[0].image} alt="" />
            </div>
          </div>

          <div className={style.caption}>{qna.images[0].caption}</div>
          {/* <div className={style.caption_parent}>
                    <div className={style.caption}>{qna.images[0].caption}</div>
                </div> */}
        </div>
      </div>
    </div>
  );
}
