import style from "./Thumbnail.module.css";
import Book3d from "../common/Book3d";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getintro } from "../../api/novel";

type NInfo = {
  coverImg: string;
  introduction: string;
};

export default function Thumbnail() {
  const location = useLocation();
  const id = location.state.id;
  const [novelid, setNovelid] = useState(id);
  const [novelinfo, setNovelinfo] = useState<NInfo>();

  useEffect(() => {
    setNovelid(id);
    async function intro() {
      try {
        const data = await getintro(novelid);
        console.log(data);
        setNovelinfo(data.data);
      } catch (e) {
        console.log(e);
      }
    }
    // intro(novelid); before code
    intro();
  }, [novelid]);

  return (
    <div>
      <div className={style.introBanner}>
        <div className={style.bookCircle}>
          <Book3d type="thumbnail" img={novelinfo && novelinfo.coverImg} />
        </div>
        <div className={style.bannerGrad} />
        <div className={style.quote}>
          <img
            src={process.env.PUBLIC_URL + "/icon/quote1_black.svg"}
            className={style.newcard_quote1}
            alt="quote1_black"
          />
          <div className={style.quotetext}>
            {novelinfo && novelinfo.introduction}
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
