import { tokeninstance } from "../api/Interceptors";

const nickname = localStorage.getItem("nickname");

export async function createPointApi() {
  return tokeninstance.post("payment/point");
}
export async function getPointApi() {
  return tokeninstance.get("payment/point", { params: { nickname: nickname } });
}
export async function updataPointApi() {
  return tokeninstance.put("payment/point");
}
export async function deletePointApi() {
  return tokeninstance.delete("payment/point");
}
export async function createOrderApi() {
  return tokeninstance.post("payment/orders");
}
export async function getOrderListApi() {
  return tokeninstance.get(`payment/orders/${nickname}`);
}
export async function getOrderDetailApi(id) {
  return tokeninstance.get(`payment/orders/${nickname}/${id}`);
}
export async function getProductListApi() {
  return tokeninstance.get("payment/items");
}
export async function getProductDetailApi(id) {
  return tokeninstance.get("payment/items/item", { params: { id: id } });
}
