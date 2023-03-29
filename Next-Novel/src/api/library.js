import {instance} from '../api/Interceptors';

export async function getnovels(){
  const res = await instance.get('novel/')
  return res
}

export async function getgenre(genre) {
  const res = await instance.get('novel', {
    params : {
      genre : genre
    }
  })
  return res
}