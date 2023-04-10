import { tokeninstance } from "../api/Interceptors";
const config = {
  headers: { "Content-Type": "multipart/form-data" },
};
export async function fetchQuestions(novelId, step) {
  return tokeninstance.get(`novel/${novelId}/step/${step}/`);
}

export async function startNovelApi(formData) {
  return tokeninstance.post(`novel/start/`, formData, config);
}

export async function continueNovelApi(formData) {
  return tokeninstance.post(`novel/continue/`, formData, config);
}

export async function endNovelApi(formData) {
  return tokeninstance.post(`novel/end/`, formData);
}

export async function makeCoverRequestApi(formData) {
  return tokeninstance.post(`novel/cover-image/`, formData, config);
}

export async function finNovelApi(formData) {
  return tokeninstance.post(`novel/complete/`, formData);
}

export async function fetchPaintings() {
  return tokeninstance.get(`user/drawing/`);
}
