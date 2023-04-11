import { useMutation, useQuery } from "@tanstack/react-query";

import { writecomment } from '../api/novelread'

export default function useCommentWrite() {


    // const submitComment = useMutation((formData)  => {
    //     for(let data of formData){
    //         console.log(data);
    //     }
    //     console.log(formData['comm'], formData.novel_id);
    //     writecomment(formData.novel_id, formData.comm)
    // });

    const submitComment = useMutation(async (requestData)  => {
        console.log(requestData.novel_id, requestData.comm);
        await writecomment(requestData.novel_id, requestData.comm)
    });


    return{
        submitComment,
    }


}