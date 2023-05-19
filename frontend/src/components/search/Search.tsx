import style from "./Search.module.css";
import Booklist from "./Booklist";

import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { getsearch, getsimilarity } from "../../api/library";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("  ");
  const [novels, setNovels] = useState([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  async function getsearchlist(keyword: string) {
    try {
      const data = await getsearch(keyword, 0);
      console.log(data);
      setNovels(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function getsimilarlist(keyword: string) {
    try {
      const data = await getsimilarity(keyword);
      console.log(data);
      setNovels(data.data);
    } catch (e) {
      console.log(e);
    }
  }

  // 일반검색
  const search = () => {
    getsearchlist(keyword);
    setResult(keyword);
  };

  // 유사도검색
  const similaritysearch = () => {
    getsimilarlist(keyword);
    setResult(keyword);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <div className={style.searchpart}>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={style.circle_left}
          alt="circles_left"
        />

        <div className={style.search}>
          <div className={style.question}>Q. 찾는 소설이 있으신가요?</div>
          <br />
          <div className={style.form}>
            A.
            <input
              type="text"
              className={style.searchinput}
              onChange={onChange}
              onKeyPress={handleOnKeyPress}
              value={keyword}
            />
            <div className={style.btnwrapper}>
              <button className={style.searchbtn} onClick={search}>
                {" "}
                제출{" "}
              </button>
              <div className={style.divbar} />
              <button className={style.searchbtn} onClick={similaritysearch}>
                {" "}
                유사도검색{" "}
              </button>
            </div>
          </div>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/img/searchpage.svg"}
          className={style.searchicon}
          alt="searchicon"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={style.circle_right}
          alt="circles_right"
        />
      </div>
      <div className={style.explain}>
        유사도 검색:&nbsp;&nbsp;키워드를 띄워쓰기로 구분해 입력하면, 유사한
        소설을 검색합니다.(최대 4단어)
      </div>
      <div className={style.search_result}>"{result}"에 대한 검색결과 :</div>
      <Booklist novels={novels} props={keyword} getsearchlist={getsearchlist} />
    </div>
  );
}
