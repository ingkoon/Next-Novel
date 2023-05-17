import { instance, tokeninstance } from "./Interceptors";

// intro 가져오기 (memberId ver.)
export async function getintro(novelid: number, memberId: number) {
  if (memberId === null) {
    memberId = 0; // nickName이 null인 경우 빈 문자열로 할당
  }
  console.log(memberId + "들어왔스빈다");
  const res = await instance.get(`novel/${novelid}`, {
    params: {
      memberId: memberId,
    },
  });
  return res;
}

//comment가져오기
export async function getcomment(id: number, memberId: number) {
  console.log(memberId + "코멘트로들어왔스빈다");
  if (memberId === null) {
    memberId = 0; // nickName이 null인 경우 빈 문자열로 할당
  }
  const res = await instance.get(`novel/${id}`, {
    params: {
      memberId: memberId,
    },
  });
  return res;
}

// 댓글 삭제하기
export async function deletecomment(commentid: number) {
  const res = await tokeninstance.delete(`comment/${commentid}`);
  return res;
}

// 글 삭제하기
export async function deletenovel(id: number) {
  const res = await tokeninstance.delete(`novel/${id}`);
  return res;
}

// 좋아요 하기
export async function postliked(novelId: number, memberId: number) {
  const res = await tokeninstance.post(
    "novel/like",
    {
      novelId: novelId,
      memberId: memberId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res;
}

// 좋아요 삭제하기
export async function deleteliked(novelId: number, memberId: number) {
  const res = await tokeninstance.delete("novel/like", {
    data: JSON.stringify({
      novelId: novelId,
      memberId: memberId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
}
