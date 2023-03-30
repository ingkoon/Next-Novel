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
