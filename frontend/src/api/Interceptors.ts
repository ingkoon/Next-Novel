import axios from "axios";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: process.env.REACT_APP_DATA_API,
});

const tokeninstance = axios.create({
  baseURL: process.env.REACT_APP_DATA_API,
});

// token 필요없는 api
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 토큰 필요한 api
tokeninstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      // console.log("보내는 토큰 : ", token);
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

tokeninstance.interceptors.response.use(
  (response) => {
    if (response.headers["authorization"]) {
      const access_token = response.headers.authorization.split(" ")[1];
      localStorage.setItem("access_token", access_token);
      // console.log("받는 토큰 : ", access_token);
    }
    return response;
  },
  (error) => {
    // const { config, response } = error;
    // const originalRequest = config;

    // if (response.status === 401) {
    //   return new Promise((resolve) => {
    //     setTimeout(() => resolve(tokeninstance(originalRequest)), 1000);
    //   });
    // }

    return Promise.reject(error);
  }
);

export { instance, tokeninstance };
