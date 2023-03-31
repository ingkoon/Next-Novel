import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchQuestions, startNovelApi } from "../api/novelwrite";
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

  return { getQuestions, startNovel };
}
