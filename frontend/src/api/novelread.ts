import { instance } from "./Interceptors";
import { tokeninstance } from "./Interceptors";

// 소설 정보(제목, 작성자, 출간일, 장르) , 소설 불러오기
export async function novelall(id: number, memberId: number) {
  if (memberId === null) {
    memberId = 0; // nickName이 null인 경우 빈 문자열로 할당
  }
  console.log(memberId + "들어왔스빈다");
  const res = await instance.get(`novel/${id}`, {
    params: {
      memberId: memberId,
    },
  });
  return res;
}

// 소감평작성
type commentData = {
  content: string;
  memberId: number;
  novelId: number;
};
export async function writecomment(commentData: commentData) {
  // console.log("넘어오나요" + formData);
  // const res = await tokeninstance.post(`novel/${id}/comment/`, {
  //   content: comment,
  // });
  // return res;

  const res = await tokeninstance.post(
    "comment",
    {
      content: commentData.content,
      memberId: commentData.memberId,
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
