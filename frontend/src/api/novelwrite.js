import { tokeninstance } from "../api/Interceptors";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};
const config2 = {
  headers: { "Content-Type": "multipart/form-data" },
  responseType: "blob",
};

export async function fetchQuestions(formData) {
  return tokeninstance.post("write/question/", formData);
}

export async function startNovelApi(formData) {
  return tokeninstance.post("write/start/", formData, config);
}

export async function continueNovelApi(formData) {
  return tokeninstance.post(`write/sequence/`, formData, config);
}

export async function endNovelApi(formData) {
  return tokeninstance.post(`write/end/`, formData);
}

export async function makeCoverRequestApi(formData) {
  return tokeninstance.post(`write/image/`, formData, config2);
}

export async function finNovelApi(formData) {
  return tokeninstance.post(`novel/`, formData, config);
}

export async function getPaintingsApi(nickName) {
  return tokeninstance.get(`/novel/image/${nickName}`);
}
