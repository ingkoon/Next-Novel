import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchQuestions,
  startNovelApi,
  continueNovelApi,
  endNovelApi,
  makeCoverRequestApi,
  finNovelApi,
  fetchPaintings,
} from "../api/novelwrite";
import { useNovelContext } from "../context/NovelContext";

export default function useNovelWrite() {
  const { novel } = useNovelContext();

  const getQuestions = useQuery(
    ["questions"],
    () => fetchQuestions(novel.id, novel.step + 1),
    {
      enabled: false,
      select: (data) => data.data,
    }
  );

  const startNovel = useMutation((formData) => startNovelApi(formData), {});

  const continueNovel = useMutation(
    (formData) => continueNovelApi(formData),
    {}
  );

  const endNovel = useMutation((formData) => endNovelApi(formData), {});

  const makeCoverRequest = useMutation(
    (formData) => makeCoverRequestApi(formData),
    {}
  );

  const finNovel = useMutation((formData) => finNovelApi(formData), {});

  const getPaintings = useQuery(["paintings"], fetchPaintings, {
    enabled: false,
    select: (data) => data.data,
  });

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
