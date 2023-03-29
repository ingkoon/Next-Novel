import {AuthContext} from "../../context/AuthContext"
import axios from 'axios';
import { useContext } from 'react'

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

async function reissueRefreshToken(data) {
  try {
    const res = await axios.post(API_SERVER_URL + '/member/reissue', data);
    return res;
  }catch (e) {
    console.error(e);
    throw e
  }



}

function setInterceptors(instance) {
  const {user, setUser} = useContext(AuthContext)
  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(
    function (config) {
      config.headers.Authorization = 'Bearer ' + user.access_token;
      return config;
    },
    function (error) {
      // 요청 오류가 있는 작업 수행
      return Promise.reject(error);
    },
  );

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    function (response) {
      // console.log(response, 'fulfilled');
      return response;
    },
    async function (error) {
      const {
        config,
        response: { status },
      } = error;
      const originalRequest = config;

      if (status === 401 && user.refresh_token) {
        const data = {
          refreshToken: user.refresh_token,
        };
        try {
          const res = await reissueRefreshToken(data);
          setUser({access_token : res.data.accessToken, refresh_token : user.refresh_token})
          config.headers.Authorization = `Bearer ${res.data.accessToken}`;
          return axios(config);
        } catch (e) {
          console.log(e);
        }
      }
      return Promise.reject(error);
    },
  );
  return instance;
}

function setInterceptorsWithNoAuth(instance) {
  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      // 요청 오류가 있는 작업 수행

      return Promise.reject(error);
    },
  );

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    function (response) {
      // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
      // 응답 데이터가 있는 작업 수행
      return response;
    },
    function (error) {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.

      return Promise.reject(error);
    },
  );
  return instance;
}

export { setInterceptors, setInterceptorsWithNoAuth, reissueRefreshToken };