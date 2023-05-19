import { instance } from "./Interceptors";
import axios from "axios";

// 전체 소설 및 장르별 검색
export async function getnovels(genre: string, page: number) {
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

// 추천 소설 목록
export async function getrecommend() {
  const res = await instance.get("novel/recommend");
  return res;
}

// 검색 결과
export async function getsearch(keyword: string, page: number) {
  const res = await instance.get("novel", {
    params: {
      genre: "all",
      keyword: keyword,
      page: page,
      size: 100,
    },
  });
  return res;
}

// 검색 결과
export async function getsimilarity(keyword: string) {
  const res = await instance.get("novel/similarity", {
    params: {
      keyword: keyword,
    },
  });
  return res;
}
