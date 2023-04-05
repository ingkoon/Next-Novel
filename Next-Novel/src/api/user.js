import { tokeninstance } from '../api/Interceptors';

// 회원정보
export async function getuserinfo(){
  const res = await tokeninstance.get('user/')
  return res
}

// 제작한 소설
export async function getmynovel(){
  const res = await tokeninstance.get('user/novel/')
  return res
}

// 좋아요한 소설
export async function getlikenovel(){
  const res = await tokeninstance.get('user/liked-novel/')
  return res
}

//회원정보 수정
export async function patchuser(data) {
  const res = await tokeninstance.patch('user/'
    ,data
    ,{
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    })
  return res
}

//회원 탈퇴
export async function deleteuser() {
  const res = await tokeninstance.delete()
  return res
}