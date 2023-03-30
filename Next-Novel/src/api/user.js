import { tokeninstance } from '../api/Interceptors';

export async function user(){
  const res = await tokeninstance.get('user/')
  return res
}