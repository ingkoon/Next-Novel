import {
  createPointApi,
  getPointApi,
  updatePointApi,
  deletePointApi,
  getOrderTokenApi,
  createOrderApi,
  cancelOrderApi,
  getOrderListApi,
  getOrderDetailApi,
  getProductListApi,
  getProductDetailApi,
} from "../api/payment";
import { CreateOrder, NickName, UpdatePoint } from "../types";

export default function useNovelWrite() {
  const createPoint = (jsonData: NickName) => {
    return createPointApi(jsonData);
  };
  const getPoint = () => {
    return getPointApi();
  };
  const updatePoint = (jsonData: UpdatePoint) => {
    return updatePointApi(jsonData);
  };
  const deletePoint = () => {
    return deletePointApi();
  };
  const getOrderToken = () => {
    return getOrderTokenApi();
  };
  const createOrder = (jsonData: CreateOrder) => {
    return createOrderApi(jsonData);
  };
  const cancelOrder = () => {
    return cancelOrderApi();
  };
  const getOrderList = () => {
    return getOrderListApi();
  };
  const getOrderDetail = (id: number) => {
    return getOrderDetailApi(id);
  };
  const getProductList = () => {
    return getProductListApi();
  };
  const getProductDetail = (id: number) => {
    return getProductDetailApi(id);
  };

  return {
    createPoint,
    getPoint,
    updatePoint,
    deletePoint,
    getOrderToken,
    createOrder,
    cancelOrder,
    getOrderList,
    getOrderDetail,
    getProductList,
    getProductDetail,
  };
}
