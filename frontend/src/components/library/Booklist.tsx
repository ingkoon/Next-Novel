import style from "./Booklist.module.css";
import Card from "../common/Card";
import Genre from "./Genre";

//api
import { useEffect, useState, useRef } from "react";
import { getnovels } from "../../api/library";

type carddata = {
  novelId: number;
  title: string;
  introduction: string;
  nickName: string;
  memberId: number;
  coverImg: string;
  hitCount: number;
  commentCount: number;
  likeCount: number;
  score: number;
};

type cardinfo = carddata[];

export default function Booklist() {
  const [novels, setNovels] = useState<cardinfo | undefined>([]);
  const [page, setPage] = useState(0);
  const [selectedGenre, setGenre] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  // api 호출하기 ( 페이지 로드시, 전체소설 불러오기->(genre:"all" , page:0) )

  const getnovel = async () => {
    try {
        setGenre("all");
        const data = await getnovels("all", 0);
        console.log("불러오자마자 페이지:"+page);
        console.log(data);
        setNovels(data.data);
      } catch (e) {
        console.log(e);
      }
  }

  useEffect(() => {
    // async function getnovel() {
    //   try {
    //     setGenre("all");
    //     const data = await getnovels("all", 0);
    //     console.log("불러오자마자 페이지:"+page);
    //     console.log(data);
    //     setNovels(data.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    getnovel();
  }, []);

  const selectgenre = async (genre: string) => {
    setIsLoading(true);
    setPage(0);
    setGenre(genre);
    const res = await getnovels(genre, 0);
    const jsonData = res.data;
    setNovels(jsonData);
    setIsLoading(false);
    console.log("가져온장르:"+genre);
    console.log("설정된장르:"+selectedGenre);
  };


  // 무한 스크롤
  const triggerRef = useRef(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getnovels(selectedGenre, page + 1); // getnovels()의 매개변수로 페이지 번호를 전달합니다.
      console.log("뒤에따라온페이지:"+page)
      const jsonData = res.data;
      setNovels((prevNovels) => [...(prevNovels || []), ...jsonData]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 바닥에서 300px 상단에서 한무스크롤 발동
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 300 && !isLoading) {
        console.log("한무스크롤발동! 현재페이지는:" + page)
        fetchData();
        setPage((prevPage) => prevPage + 1); // 페이지 업데이트
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);


  //카드 삭제 시 리스트 다시 불러오기
  const goTop = () => {
    window.scrollTo({ top: 250, behavior: "smooth" });
  };
  const refreshList = async () => {
    selectgenre("all");
    goTop();
  }

  return (
    <div>
      <Genre selectgenre={selectgenre} />
      <hr className={style.line} />
      <div className={style.list}>
        {novels?.map((novelcard, index) => (
          <Card key={index} props={novelcard} refreshList={refreshList} />
        ))}
      </div>
      {/* <div className={style.trigger} ref={triggerRef}></div> */}
    </div>
  );
}
