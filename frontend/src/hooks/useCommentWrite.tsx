import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { writecomment } from "../api/novelread";
import axios, { AxiosRequestConfig } from "axios";

export default function useCommentWrite() {
  const submitComment = useMutation(
    async ({
      content,
      memberId,
      novelId,
    }: {
      content: string;
      memberId: number;
      novelId: number;
    }) => {
      const res = await writecomment({ content, memberId, novelId });
      return res.data;
    }
  );

  return {
    submitComment,
  };
}
