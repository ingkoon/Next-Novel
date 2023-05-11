import { instance } from "../api/Interceptors";
import { tokeninstance } from "../api/Interceptors";
import axios from "axios";

// 소설 정보(제목, 작성자, 출간일, 장르) , 소설 불러오기
export async function novelall(id, nickName) {
  // const res = await instance.get(`novel/${id}/`);
  // return res;
  // return axios.get("/novel/read/novel_read2.json");
  if (nickName === null) {
    nickName = ""; // nickName이 null인 경우 빈 문자열로 할당
  }
  console.log(nickName + "들어왔스빈다");
  const res = await instance.get(`novel/${id}/`, {
    params: {
      nickName: nickName,
    },
  });
  return res;
}

// 소감평작성
export async function writecomment(commentData) {
  // console.log("넘어오나요" + formData);
  // const res = await tokeninstance.post(`novel/${id}/comment/`, {
  //   content: comment,
  // });
  // return res;

  const res = await tokeninstance.post(
    "comment/",
    {
      content: commentData.content,
      nickName: commentData.nickName,
      novelId: commentData.novelId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}
