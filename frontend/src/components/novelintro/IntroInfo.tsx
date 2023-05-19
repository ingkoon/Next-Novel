import React, { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import BookInfo from "./BookInfo";
import Comments from "./Comments";
import { getintro } from "../../api/novel";
import { useParams } from "react-router-dom";
import { NovelInfoType } from "../../types/novel";

export default function IntroInfo() {
  const { id } = useParams();
  const novelId = Number(id)!;
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
      {novelInfo && (
        <>
          <Thumbnail novelInfo={novelInfo} />
          <BookInfo novelInfo={novelInfo} getIntroAsync={getIntroAsync} />
          <Comments novelInfo={novelInfo} getIntroAsync={getIntroAsync} />
        </>
      )}
    </>
  );
}
