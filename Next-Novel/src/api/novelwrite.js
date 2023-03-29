import apiClient from "./client";
const config = {
  headers: { "Content-Type": "multipart/form-data" },
};

export async function startNovelApi(formData) {
  return apiClient.post(`api/novel/start/`, formData, config);
}
