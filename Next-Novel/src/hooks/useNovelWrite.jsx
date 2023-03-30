import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { startNovelApi } from "../api/novelwrite";

export default function useNovelWrite() {
  const queryClient = useQueryClient();

  const startNovel = useMutation((formData) => startNovelApi(formData), {
    //   onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  return { startNovel };
}
