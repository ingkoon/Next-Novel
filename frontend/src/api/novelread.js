import {instance} from '../api/Interceptors';
import {tokeninstance} from '../api/Interceptors';


// 소설 정보(제목, 작성자, 출간일, 장르) , 소설 불러오기
export async function novelall(id){
    const res = await tokeninstance.get(`novel/${id}/`)
    return res
  }

// 소감평작성
export async function writecomment(id, comment) {
  console.log("넘어오나요"+id);
  const res = await tokeninstance.post(`novel/${id}/comment/`, {
        content : comment
  })
  return res
}