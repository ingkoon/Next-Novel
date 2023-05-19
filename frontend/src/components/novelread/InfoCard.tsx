import style from "./InfoCard.module.css";
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
  const Nid = id ? parseInt(id) : 0;
  const [novelid, setNovelid] = useState<number>(Nid);
  const [novelinfo, setNovelinfo] = useState<NInfo>();
  const [create, setCreate] = useState("");

  //로컬 멤버아이디
  const localValue: string | null = localStorage.getItem("memberId");
  const localMemberId: number = localValue !== null ? parseInt(localValue) : 0;

  async function nvinfo() {
    try {
      const data = await novelall(novelid, localMemberId);
      console.log(data);
      setNovelinfo(data.data);
      const year = data.data.createdAt.substring(0, 4);
      const month = data.data.createdAt.substring(5, 7);
      const date = data.data.createdAt.substring(8, 10);
      setCreate(year + "." + month + "." + date);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    setNovelid(Nid);
    nvinfo();
  }, [novelid]);

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.bar} />
        <div className={style.information}>
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
