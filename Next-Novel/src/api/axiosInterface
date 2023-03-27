import axios from "axios";

/** axiosInterface is using axios module.
 * It's just help to fetch easly axios's argument.
 * baseurl is fixed. So if you want to change this, you have to change in axiosInterface.
 * method and url are required. And their type is String.
 * data, headers and params, their type is object, they work like data in axios.
 * If axios returned right response, it return common response.
 * If axios raised an error, it return axios error. If you want to get response, you can use key named 'response'.
 */
export default async function axiosInterface(
  method,
  url,
  data = {},
  headers = {},
  params = {}
) {
  console.log = function () {};
  console.error = function () {};
  console.warn = function () {};

  if (headers.Authorization) {
    const myInterceptor = axios.interceptors.response.use(
      function (res) {
        axios.interceptors.response.eject(myInterceptor);
        console.log(res);
        return res;
      },
      async function (err) {
        console.log("start");
        const { config } = err;
        const responseData = err.response;
        const state = JSON.parse(localStorage.getItem("persist:root"));
        const authentication = JSON.parse(state.auth);

        if (responseData.data.msg === "Login Require") {
          axios.interceptors.response.eject(myInterceptor);

          const refreshResponse = await axios({
            method: "post",
            baseURL: "https://j8a502.p.ssafy.io",
            url: "/api/reissue",
            data: {
              grantType: "Bearer",
              accessToken: authentication.authentication.token,
              refreshToken: authentication.authentication.refreshToken,
            },
          })
            .then((refreshResponse) => refreshResponse)
            .catch((error) => {
              return error;
            });

          console.log(refreshResponse);

          if (refreshResponse.status === 200) {
            config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            const data2 = await axios(config);
            data2.newToken = refreshResponse.data.accessToken;

            return Promise.resolve(data2);
          } else if (refreshResponse.response.status === 307) {
            return Promise.reject(refreshResponse);
          }
        }
      }
    );
  }

  let response = await axios({
    method: method,
    url: url,
    baseURL: "https://j8a502.p.ssafy.io",
    data: data,
    headers: headers,
    params: params,
  })
    .then((res) => res)
    .catch((err) => {
      return err;
    });

  return response;
}