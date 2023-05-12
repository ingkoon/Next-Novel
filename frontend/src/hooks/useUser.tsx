import { useMutation } from "@tanstack/react-query";
import {
  normalRegistApi,
  emailCheckApi,
  nickNameCheckApi,
  normalLoginApi,
  LogoutApi,
  getUserInfoApi,
  putUserInfoApi,
  getLikeNovelApi,
  getMyNovelApi,
} from "../api/user";

export default function useNovelWrite() {
  const normalRegist = useMutation(
    (jsonData: Object) => normalRegistApi(jsonData),
    {}
  );

  const emailCheck = useMutation(
    (jsonData: Object) => emailCheckApi(jsonData),
    {}
  );

  const nickNameCheck = useMutation(
    (jsonData: Object) => nickNameCheckApi(jsonData),
    {}
  );

  const normalLogin = useMutation(
    (jsonData: Object) => normalLoginApi(jsonData),
    {}
  );

  const Logout = () => {
    return LogoutApi();
  };

  const getUserInfo = () => {
    return getUserInfoApi();
  };

  const putUserInfo = useMutation(
    (formData: FormData) => putUserInfoApi(formData),
    {}
  );

  const getLikeNovel = () => {
    return getLikeNovelApi();
  };

  const getMyNovel = () => {
    return getMyNovelApi();
  };

  return {
    normalRegist,
    emailCheck,
    nickNameCheck,
    normalLogin,
    Logout,
    getUserInfo,
    putUserInfo,
    getLikeNovel,
    getMyNovel,
  };
}
