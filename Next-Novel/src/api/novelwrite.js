import { tokeninstance } from "../api/Interceptors";
const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

export async function startNovelApi(formData) {
  return tokeninstance.post(`novel/start/`, formData, config);
}
