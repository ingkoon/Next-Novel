import { tokeninstance } from "./Interceptors";
import { CreateOrder, MemberId, UpdatePoint } from "../types/payment";

const config = {
  headers: { "Content-Type": "application/json" },
};

export async function createPointApi(jsonData: MemberId) {
  return tokeninstance.post("point", jsonData, config);
}
export async function getPointApi() {
  return tokeninstance.get("point", {
    params: { memberId: localStorage.getItem("memberId") },
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
export async function cancelOrderApi(orderId: number) {
  return tokeninstance.delete("orders", { params: { orderId: orderId } });
}
export async function getOrderListApi() {
  return tokeninstance.get(`orders/${localStorage.getItem("memberId")}`);
}
export async function getOrderDetailApi(id: number) {
  return tokeninstance.get(`orders/${localStorage.getItem("memberId")}/${id}`);
}
export async function getProductListApi() {
  return tokeninstance.get("items");
}
export async function getProductDetailApi(id: number) {
  return tokeninstance.get("items/item", { params: { id: id } });
}
