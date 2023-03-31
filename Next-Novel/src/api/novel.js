import { instance, tokeninstance } from '../api/Interceptors';

// intro가져오기
export async function getintro(id){
  const res = await instance.get(`novel/${id}/preview/`)
  return res
}

//comment가져오기
export async function getcomment(id) {
  const res = await instance.get(`novel/${id}/comment/`)
  return res
}

// 댓글 삭제하기
export async function deletecomment(id) {
  const res = await tokeninstance.delete(`novel/${id}/comment/`)
  return res
}