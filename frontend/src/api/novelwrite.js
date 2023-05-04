import { instance, tokeninstance } from "../api/Interceptors";
import axios from "axios";

const config = {
  headers: { "Content-Type": "multipart/form-data" },
};
const config2 = {
  headers: { "Content-Type": "multipart/form-data" },
  responseType: "blob",
};

export async function fetchQuestions(formData) {
  return instance.post("/write/question/", formData);
}

export async function startNovelApi(formData) {
  return instance.post("write/start/", formData, config);
}

export async function continueNovelApi(formData) {
  return instance.post(`/write/sequence`, formData, config);
}

export async function endNovelApi(formData) {
  return instance.post(`/write/end`, formData);
}

export async function makeCoverRequestApi(formData) {
  return instance.post(`/write/image`, formData, config2);
}

export async function finNovelApi(formData) {
  // return tokeninstance.post(`novel/complete/`, formData);
  return axios.get("/novel/fin_novel.json");
}

export async function fetchPaintings() {
  // return tokeninstance.get(`user/drawing/`);
  return axios.get("/novel/paintings.json");
}
