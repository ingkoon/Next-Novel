import { instance } from '../api/Interceptors';

// intro가져오기
export async function getintro(id){
  const res = await instance.get(`novel/${id}/preview/`)
  return res
}