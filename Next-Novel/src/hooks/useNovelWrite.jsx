import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchQuestions,
  startNovelApi,
  continueNovelApi,
  endNovelApi,
} from "../api/novelwrite";
import { useNovelContext } from "../context/NovelContext";

export default function useNovelWrite() {
  const { novel, setNovel } = useNovelContext();

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

  return { getQuestions, startNovel, continueNovel, endNovel };
}
