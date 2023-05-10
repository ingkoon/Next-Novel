import {
  createPointApi,
  getPointApi,
  updataPointApi,
  deletePointApi,
  createOrderApi,
  getOrderListApi,
  getOrderDetailApi,
  getProductListApi,
  getProductDetailApi,
} from "../api/payment";

export default function useNovelWrite() {
  const createPoint = () => {
    return createPointApi();
  };
  const getPoint = () => {
    return getPointApi();
  };
  const updataPoint = () => {
    return updataPointApi();
  };
  const deletePoint = () => {
    return deletePointApi();
  };
  const createOrder = () => {
    return createOrderApi();
  };
  const getOrderList = () => {
    return getOrderListApi();
  };
  const getOrderDetail = () => {
    return getOrderDetailApi();
  };
  const getProductList = () => {
    return getProductListApi();
  };
  const getProductDetail = () => {
    return getProductDetailApi();
  };

  return {
    createPoint,
    getPoint,
    updataPoint,
    deletePoint,
    createOrder,
    getOrderList,
    getOrderDetail,
    getProductList,
    getProductDetail,
  };
}
