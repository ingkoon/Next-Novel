import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { writecomment } from "../api/novelread";
import axios, { AxiosRequestConfig } from "axios";

export default function useCommentWrite() {
  const submitComment = useMutation(
    async ({
      content,
      nickName,
      novelId,
    }: {
      content: string;
      nickName: string | null;
      novelId: string | undefined;
    }) => {
      const res = await writecomment({ content, nickName, novelId });
      return res.data;
    }
  );

  return {
    submitComment,
  };
}
