import { useMutation } from "@tanstack/react-query";
import {
  normalRegistApi,
  emailCheckApi,
  nicknameCheckApi,
  normalLoginApi,
  LogoutApi,
  getUserInfoApi,
  putUserInfoApi,
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

  const nicknameCheck = useMutation(
    (jsonData: Object) => nicknameCheckApi(jsonData),
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

  return {
    normalRegist,
    emailCheck,
    nicknameCheck,
    normalLogin,
    Logout,
    getUserInfo,
    putUserInfo,
  };
}