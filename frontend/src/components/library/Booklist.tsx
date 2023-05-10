import style from "./Booklist.module.css";
import Card from "../common/Card";
import Genre from "./Genre";

//api
import { useEffect, useState } from "react";
import { getnovels, getgenre } from "../../api/library";


export default function Booklist() {
  const [novels, setNovels] = useState([]);

  // api 호출하기
  useEffect(() => {
    async function getnovel() {
      try {
        const data = await getnovels();
        console.log(data);
        setNovels(data.data);
      } catch (e) {
        console.log(e);
      }
    }

    getnovel();
  }, []);

  const selectgenre = (data:string) => {
    getgenreres(data);
  };

  async function getgenreres(genre:string) {
    const data = await getgenre(genre);
    try {
      setNovels(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Genre selectgenre={selectgenre} />
      <hr className={style.line} />
      <div className={style.list}>
        {novels?.map((novelcard, index) => (
          <Card key={index} props={novels && novelcard} />
        ))}
      </div>
    </div>
  );
}
