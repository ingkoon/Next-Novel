import { instance, tokeninstance } from "./Interceptors";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};
const config2 = {
  headers: { "Content-Type": "application/json" },
};

// 자체 회원가입
export async function normalRegistApi(jsonData: Object) {
  return instance.post("member/join", jsonData, config2);
}

// 이메일 중복 검사
export async function emailCheckApi(jsonData: Object) {
  return instance.post("member/check/email", jsonData, config2);
}

// 닉네임 중복 검사
export async function nickNameCheckApi(jsonData: Object) {
  return instance.post("member/check/nickName", jsonData, config2);
}

// 자체 로그인
export async function normalLoginApi(jsonData: Object) {
  return instance.post("member/login", jsonData, config2);
}

// 로그아웃
export async function LogoutApi() {
  return tokeninstance.get("member/logout");
}

// 내 정보 조회
export async function getUserInfoApi() {
  return tokeninstance.get("member/myPage");
}

//내 정보 수정
export async function putUserInfoApi(formData: FormData) {
  return tokeninstance.put(`member/myPage`, formData, config);
}

// 좋아요한 소설
export async function getLikeNovelApi() {
  return tokeninstance.get(`novel/like/${localStorage.getItem("memberId")}`);
}

// 제작한 소설
export async function getMyNovelApi() {
  return tokeninstance.get(`novel/my/${localStorage.getItem("memberId")}`);
}

//회원 탈퇴
export async function deleteuser() {
  return tokeninstance.delete(`member/myPage`);
}
