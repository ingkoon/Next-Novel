import { useMutation } from "@tanstack/react-query";
import {
  normalRegistApi,
  emailCheckApi,
  nicknameCheckApi,
  normalLoginApi,
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

  return {
    normalRegist,
    emailCheck,
    nicknameCheck,
    normalLogin,
  };
}
