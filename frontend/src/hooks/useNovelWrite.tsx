import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchQuestions,
  startNovelApi,
  continueNovelApi,
  endNovelApi,
  makeCoverRequestApi,
  finNovelApi,
  getPaintingsApi,
} from "../api/novelwrite";

export default function useNovelWrite() {
  const getQuestions = useMutation(
    (formData: FormData) => fetchQuestions(formData),
    {}
  );

  const startNovel = useMutation(
    (formData: FormData) => startNovelApi(formData),
    {}
  );

  const continueNovel = useMutation(
    (formData: FormData) => continueNovelApi(formData),
    {}
  );

  const endNovel = useMutation(
    (formData: FormData) => endNovelApi(formData),
    {}
  );

  const makeCoverRequest = useMutation(
    (formData: FormData) => makeCoverRequestApi(formData),
    {}
  );

  const finNovel = useMutation(
    (formData: FormData) => finNovelApi(formData),
    {}
  );

  const getPaintings = useQuery(
    ["paintings"],
    () => getPaintingsApi(localStorage.getItem("memberId")!),
    {
      enabled: false,
      select: (data) => data.data,
    }
  );

  return {
    getQuestions,
    startNovel,
    continueNovel,
    endNovel,
    makeCoverRequest,
    finNovel,
    getPaintings,
  };
}
