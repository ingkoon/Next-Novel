import { instance, tokeninstance } from '../api/Interceptors';

// intro가져오기
export async function getintro(id){
  const res = await tokeninstance.get(`novel/${id}/preview/`)
  return res
}

//comment가져오기
export async function getcomment(id) {
  const res = await instance.get(`novel/${id}/comment/`)
  return res
}

// 댓글 삭제하기
export async function deletecomment(id, commentid) {
  const res = await tokeninstance.delete(`novel/${id}/comment/${commentid}/`)
  return res
}

// 글 삭제하기
export async function deletenovel(id) {
  const res = await tokeninstance.delete(`novel/${id}/`)
  return res
}

// 좋아요 하기
export async function postliked(id) {
  const res = await tokeninstance.post(`novel/${id}/like/`)
  return res
}