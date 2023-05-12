import { instance } from "../api/Interceptors";
import axios from "axios";

// 전체 소설 및 장르별 검색
export async function getnovels(genre, page) {
  const res = await instance.get("novel", {
    params: {
      genre: genre,
      keyword: "",
      page: page,
      size: 12,
    },
  });
  return res;
}

// 장르별 검색
// export async function getgenre(genre, page) {
//   const res = await instance.get("novel", {
//     params: {
//       genre: genre,
//       keyword: "",
//       page: page,
//       size: 12,
//     },
//   });
//   return res;
// }

// 추천 소설 목록
export async function getrecommend() {
  const res = await instance.get("novel/recommend");
  return res;
}

// 검색 결과
export async function getsearch(keyword, page) {
  const res = await instance.get("novel", {
    params: {
      genre: "all",
      keyword: keyword,
      page: page,
      size: 12,
    },
  });
  return res;
}
