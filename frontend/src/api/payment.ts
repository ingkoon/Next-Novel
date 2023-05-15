import { tokeninstance } from "./Interceptors";
import { CreateOrder, NickName, UpdatePoint } from "../types";

const config = {
  headers: { "Content-Type": "application/json" },
};

export async function createPointApi(jsonData: NickName) {
  return tokeninstance.post("point", jsonData, config);
}
export async function getPointApi() {
  return tokeninstance.get("point", {
    params: { nickName: localStorage.getItem("nickName") },
  });
}
export async function updatePointApi(jsonData: UpdatePoint) {
  return tokeninstance.put("point", jsonData);
}
export async function deletePointApi() {
  return tokeninstance.delete("point");
}
export async function getOrderTokenApi() {
  return tokeninstance.get("orders");
}
export async function createOrderApi(jsonData: CreateOrder) {
  return tokeninstance.post("orders", jsonData, config);
}
export async function cancelOrderApi() {
  return tokeninstance.delete("orders");
}
export async function getOrderListApi() {
  return tokeninstance.get(`orders/${localStorage.getItem("nickName")}`);
}
export async function getOrderDetailApi(id: number) {
  return tokeninstance.get(`orders/${localStorage.getItem("nickName")}/${id}`);
}
export async function getProductListApi() {
  return tokeninstance.get("items");
}
export async function getProductDetailApi(id: number) {
  return tokeninstance.get("items/item", { params: { id: id } });
}
