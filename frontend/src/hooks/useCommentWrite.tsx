import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { writecomment } from "../api/novelread";
import axios, { AxiosRequestConfig } from "axios";

export default function useCommentWrite() {
  const submitComment = useMutation(
    (formData: FormData) => writecomment(formData),
    {}
  );

  return {
    submitComment,
  };
}
// const submitComment = useMutation((formData)  => {
//     for(let data of formData){
//         console.log(data);
//     }
//     console.log(formData['comm'], formData.novel_id);
//     writecomment(formData.novel_id, formData.comm)
// });

//   const submitComment = useMutation(async (requestData: requestDatatype) => {
//     console.log(requestData.novel_id, requestData.comm);
//     await writecomment(requestData.novel_id, requestData.comm);
//   });

//   return {
//     submitComment,
//   };
// }

// const useCommentMutation = function() {
//   const queryClient = useQueryClient();
//   return useMutation(
//     async function(request: AxiosRequestConfig) {
//       return axios(request);
//     },
//     {
//       onSuccess: function() {
//         queryClient.invalidateQueries([`asdfasd`]);
//       },
//     }
//   );
// };

// const {mutate, mutateAsync} = useCommentMutation({onSuccess: function() {console.log("Asdf")}})

// mutateAsync({
//     method: ``,
//     url: ``,
//     baseURL: ``,
//     proxy: ``,
//     data: {

//     },
//     headers: {

//     },
//     params: {}
// }).then(())
