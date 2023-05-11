import { instance, tokeninstance } from "../api/Interceptors";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};
const config2 = {
  headers: { "Content-Type": "application/json" },
};

// 자체 회원가입
export async function normalRegistApi(jsonData) {
  return instance.post("member/join/", jsonData, config2);
}

// 이메일 중복 검사
export async function emailCheckApi(jsonData) {
  return instance.post("member/check/email/", jsonData, config2);
}

// 닉네임 중복 검사
export async function nicknameCheckApi(jsonData) {
  return instance.post("member/check/nickname/", jsonData, config2);
}

// 자체 로그인
export async function normalLoginApi(jsonData) {
  return instance.post("member/login/", jsonData, config2);
}

// 로그아웃
export async function LogoutApi() {
  return tokeninstance.get("member/logout/");
}

// 내 정보 조회
export async function getUserInfoApi() {
  return tokeninstance.get("member/myPage");
}

//내 정보 수정
export async function putUserInfoApi(formData) {
  return tokeninstance.put(`member/myPage`, formData, config);
}

// 좋아요한 소설
export async function getLikeNovelApi() {
  return tokeninstance.get(`novel/like/${localStorage.getItem("nickname")}`);
}

// 제작한 소설
export async function getMyNovelApi() {
  return tokeninstance.get(`novel/id/${localStorage.getItem("nickname")}`);
}

//회원 탈퇴
export async function deleteuser() {
  const res = await tokeninstance.delete();
  return res;
}
