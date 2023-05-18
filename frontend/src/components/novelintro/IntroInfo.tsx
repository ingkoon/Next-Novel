import React, { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import BookInfo from "./BookInfo";
import Comments from "./Comments";
import { getintro } from "../../api/novel";
import { useLocation } from "react-router-dom";

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

export default function IntroInfo() {
  const location = useLocation();
  const novelId = location.state.novelId;
  const [novelInfo, setNovelInfo] = useState<NovelInfoType | undefined>();
  const memberId = localStorage.getItem("memberId")
    ? Number(localStorage.getItem("memberId"))
    : 0;

  useEffect(() => {
    getIntroAsync();
  }, []);

  async function getIntroAsync() {
    try {
      const res = await getintro(novelId!, memberId);
      console.log(res);
      setNovelInfo(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {novelInfo && <Thumbnail novelInfo={novelInfo} />}
      {novelInfo && (
        <BookInfo
          novelInfo={novelInfo}
          novelId={novelId}
          getIntroAsync={getIntroAsync}
        />
      )}
      <Comments />
    </>
  );
}
