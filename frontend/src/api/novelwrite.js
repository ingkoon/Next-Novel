// import { tokeninstance } from "../api/Interceptors";
import axios from "axios";

// const config = {
//   headers: { "Content-Type": "multipart/form-data" },
// };
export async function fetchQuestions(novelId, step) {
  // return tokeninstance.get(`novel/${novelId}/step/${step}/`);
  return axios.get("/novel/questions.json");
}

export async function startNovelApi(formData) {
  // return tokeninstance.post(`novel/start/`, formData, config);
  return axios.get("/novel/start_novel.json");
}

export async function continueNovelApi(formData) {
  // return tokeninstance.post(`novel/continue/`, formData, config);
  return axios.get("/novel/continue_novel.json");
}

export async function endNovelApi(formData) {
  // return tokeninstance.post(`novel/end/`, formData);
  return axios.get("/novel/end_novel.json");
}

export async function makeCoverRequestApi(formData) {
  // return tokeninstance.post(`novel/cover-image/`, formData, config);
  return axios.get("/novel/cover.json");
}

export async function finNovelApi(formData) {
  // return tokeninstance.post(`novel/complete/`, formData);
  return axios.get("/novel/fin_novel.json");
}

export async function fetchPaintings() {
  // return tokeninstance.get(`user/drawing/`);
  return axios.get("/novel/paintings.json");
}
