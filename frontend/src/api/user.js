import { instance, tokeninstance } from "../api/Interceptors";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};
const config2 = {
  headers: { "Content-Type": "application/json" },
};

// 자체 회원가입
export async function normalRegistApi(jsonData) {
  return instance.post("member/join", jsonData, config2);
}

// 이메일 중복 검사
export async function emailCheckApi(jsonData) {
  return instance.post("member/check/email", jsonData, config2);
}

// 닉네임 중복 검사
export async function nicknameCheckApi(jsonData) {
  return instance.post("member/check/nickname", jsonData, config2);
}

// 자체 로그인
export async function normalLoginApi(jsonData) {
  return instance.post("member/login", jsonData, config2);
}

// 회원정보
export async function getuserinfo() {
  const res = await tokeninstance.get("user/");
  return res;
}

// 제작한 소설
export async function getmynovel() {
  const res = await tokeninstance.get("user/novel/");
  return res;
}

// 좋아요한 소설
export async function getlikenovel() {
  const res = await tokeninstance.get("user/liked-novel/");
  return res;
}

//회원정보 수정
export async function patchuser(data) {
  const res = await tokeninstance.patch("user/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
}

//회원 탈퇴
export async function deleteuser() {
  const res = await tokeninstance.delete();
  return res;
}
