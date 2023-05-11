import { instance, tokeninstance } from "../api/Interceptors";
import axios from "axios";

// intro가져오기
// export async function getintro(id) {
//   const res = await instance.get(`novel/${id}/`);
//   return res;
// }
// intro 가져오기 (nickName ver.)
export async function getintro(id, nickName) {
  console.log(nickName + "들어왔스빈다");
  const res = await instance.get(`novel/${id}/`, {
    params: {
      nickName: nickName,
    },
  });
  return res;
}

//comment가져오기
export async function getcomment(id, nickName) {
  console.log(nickName + "코멘트로들어왔스빈다");
  const res = await instance.get(`novel/${id}/`, {
    params: {
      nickName: nickName,
    },
  });
  return res;
}

// 댓글 삭제하기
export async function deletecomment(id, commentid) {
  const res = await tokeninstance.delete(`novel/${id}/comment/${commentid}/`);
  return res;
}

// 글 삭제하기
export async function deletenovel(id) {
  const res = await tokeninstance.delete(`novel/${id}/`);
  return res;
}

// 좋아요 하기
export async function postliked(id) {
  const res = await tokeninstance.post(`novel/${id}/like/`);
  return res;
}
