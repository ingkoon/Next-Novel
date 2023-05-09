import { instance } from "../api/Interceptors";
import axios from "axios";

// 전체 소설 목록
export async function getnovels() {
  const res = await instance.get("novel/");
  return res;
  // return axios.get("/novel/read/novel_list.json");
}

// 장르별 검색
export async function getgenre(genre) {
  const res = await instance.get("novel", {
    params: {
      genre: genre,
    },
  });
  return res;
}

// 추천 소설 목록
export async function getrecommend() {
  const res = await instance.get("novel/recommend/");
  return res;
}

// 검색 결과
export async function getsearch(keyword) {
  // const res = await instance.get('novel', {
  //   params : {
  //     search : keyword
  //   }
  // })
  // return res
  // return axios.get("/novel/search/search_list.json");
}
