import {instance} from '../api/Interceptors';

export async function getnovels(){
  const res = await instance.get('novel/')
  return res
}