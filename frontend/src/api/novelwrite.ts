import { tokeninstance } from "./Interceptors";
import { AxiosRequestConfig } from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};
const config2: AxiosRequestConfig<FormData> = {
  headers: { "Content-Type": "multipart/form-data" },
  responseType: "blob",
};

export async function fetchQuestions(formData: FormData) {
  return tokeninstance.post("write/question", formData);
}

export async function startNovelApi(formData: FormData) {
  return tokeninstance.post("write/start", formData, config);
}

export async function continueNovelApi(formData: FormData) {
  return tokeninstance.post(`write/sequence`, formData, config);
}

export async function endNovelApi(formData: FormData) {
  return tokeninstance.post(`write/end`, formData);
}

export async function makeCoverRequestApi(formData: FormData) {
  return tokeninstance.post(`write/image`, formData, config2);
}

export async function finNovelApi(formData: FormData) {
  return tokeninstance.post(`novel`, formData, config);
}

export async function getPaintingsApi(memberId: string) {
  return tokeninstance.get(`/novel/image/${memberId}`);
}
