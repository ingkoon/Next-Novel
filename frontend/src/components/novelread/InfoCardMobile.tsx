import style from "./InfoCardMobile.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { novelall } from "../../api/novelread";

type Params = {
  id: string;
};

type NInfo = {
  id: number;
  title: string;
  introduction: string;
  createdAt: string;
  engGenre: string;
  korGenre: string;
  nickName: string;
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
      const year = data.data.created_at.substring(0, 4);
      const month = data.data.created_at.substring(5, 7);
      const date = data.data.created_at.substring(8, 10);
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
      <div className={style.content}>
        <div className={style.part1}>
          <img
            src={process.env.PUBLIC_URL + "/img/NN_LOGO_text.svg"}
            className={style.logo}
            alt="NN_LOGO_text"
          />
        </div>
        <div className={style.header}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;_ 도서열람증
        </div>
        <div className={style.information}>
          <div className={style.title}>{novelinfo && novelinfo.title}</div>
          <div className={style.sub}>
            제작자 :<div>&nbsp;{novelinfo && novelinfo.nickName}</div>
          </div>
          <div className={style.sub}>
            출간일 :<div>&nbsp;{novelinfo && create}</div>
          </div>
          <div className={style.sub}>
            장르 :<div>&nbsp;{novelinfo && novelinfo.korGenre}</div>
          </div>
        </div>
        <div className={style.blank}>
          <img
            src={process.env.PUBLIC_URL + "/img/barcode.svg"}
            className={style.barcode}
            alt="barcode"
          />
        </div>
      </div>
    </div>
  );
}
