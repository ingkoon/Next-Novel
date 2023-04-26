import style from "./InfoCard.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { novelall } from "../../api/novelread";

type Params = {
  id: string;
};

type NInfo = {
  author: string;
  cover_img: string;
  created_at: string;
  genre: string;
  id: number;
  introduction: string;
  original_cover_img: string;
  status: number;
  step: number;
  title: string;
};

export default function InfoCard() {
  const { id } = useParams<Params>();
  const [novelid, setNovelid] = useState(id);
  const [novelinfo, setNovelinfo] = useState<NInfo>();
  const [create, setCreate] = useState("");

  async function nvinfo() {
    try {
      const data = await novelall(novelid);
      console.log(data);
      setNovelinfo(data.data.novel);
      const year = data.data.novel.created_at.substring(0, 4);
      const month = data.data.novel.created_at.substring(5, 7);
      const date = data.data.novel.created_at.substring(8, 10);
      setCreate(year + "." + month + "." + date);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setNovelid(id);
    nvinfo();
  }, [novelid]);

  return (
    <div className={style.wrapper}>
      <div className={style.bar} />
      <div className={style.content}>
        <img
          src={process.env.PUBLIC_URL + "/img/NN_LOGO_text.svg"}
          className={style.logo}
          alt="NN_LOGO_text"
        />
        <div className={style.header}>&gt;_ 도서열람증</div>
        <div className={style.title}>{novelinfo && novelinfo.title}</div>
        <div className={style.sub}>
          제작자 :<div>&nbsp;{novelinfo && novelinfo.author}</div>
        </div>
        <div className={style.sub}>
          출간일 :<div>&nbsp;{novelinfo && create}</div>
        </div>
        <div className={style.sub}>
          장르 :<div>&nbsp;{novelinfo && novelinfo.genre}</div>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/img/barcode.svg"}
          className={style.barcode}
          alt="barcode"
        />
      </div>
    </div>
  );
}
