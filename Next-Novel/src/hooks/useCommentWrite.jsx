import { useMutation, useQuery } from "@tanstack/react-query";

import { writecomment } from '../api/novelread'

export default function useCommentWrite() {


    const submitComment = useMutation((formData) => writecomment(formData.novel_id, formData.comm));


    return{
        submitComment,
    }


}