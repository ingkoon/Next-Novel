import { instance } from "../api/Interceptors";
import { tokeninstance } from "../api/Interceptors";
import axios from "axios";

// 소설 정보(제목, 작성자, 출간일, 장르) , 소설 불러오기
export async function novelall(id) {
  // const res = await tokeninstance.get(`novel/${id}/`);
  // return res;
  const res = await instance.get(`novel/${id}/`);
  return res;
  // return axios.get("/novel/read/novel_read2.json");
}

// 소감평작성
export async function writecomment(formData) {
  // console.log("넘어오나요" + formData);
  // const res = await tokeninstance.post(`novel/${id}/comment/`, {
  //   content: comment,
  // });
  // return res;

  const id = formData.get("novel_id");
  const res = await tokeninstance.post(`novel/${id}/comment/`, formData);
  return res;
}
