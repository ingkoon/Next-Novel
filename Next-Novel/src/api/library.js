import {instance} from '../api/Interceptors';

// 전체 소설 목록
export async function getnovels(){
  const res = await instance.get('novel/')
  return res
}

// 장르별 검색
export async function getgenre(genre) {
  const res = await instance.get('novel', {
    params : {
      genre : genre
    }
  })
  return res
}

// 추천 소설 목록
export async function getrecommend() {
  const res = await instance.get('novel/recommend/')
  return res
}