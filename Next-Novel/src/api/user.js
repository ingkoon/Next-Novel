import { tokeninstance } from '../api/Interceptors';

// 회원정보
export async function user(){
  const res = await tokeninstance.get('user/')
  return res
}

// 제작한 소설
export async function getmynovel(){
  const res = await tokeninstance.get('user/novel/')
  return res
}

export async function getlikenovel(){
  const res = await tokeninstance.get('user/liked-novel/')
  return res
}