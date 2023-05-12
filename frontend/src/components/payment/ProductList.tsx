import React, { useEffect, useState } from "react";
import style from "./ProductList.module.css";
import usePayment from "../../hooks/usePayment";
import { CreateOrder } from "../../types";

type ProductType = {
  id: number;
  point: number;
  price: number;
};

export default function ProductList() {
  const { getProductList, createOrder, getPoint } = usePayment();
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [point, setPoint] = useState();

  useEffect(() => {
    getPointAsync();
    getProductListAsync();
  }, []);

  async function getPointAsync() {
    try {
      const res = await getPoint();
      console.log(res);
      setPoint(res.data.point);
    } catch (e) {
      console.log(e);
    }
  }

  async function getProductListAsync() {
    try {
      const res = await getProductList();
      console.log(res);
      setProductList(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  const chargePoint = (product: ProductType) => {
    //토큰 요청 성공 시

    const jsonData: CreateOrder = {
      nickName: localStorage.getItem("nickName")!,
      itemId: product.id,
      price: product.price,
      receiptId: "",
    };

    createOrderAsync(jsonData);
  };

  async function createOrderAsync(jsonData: CreateOrder) {
    try {
      const res = await createOrder(jsonData);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.list}>
        {productList.map((product, index) => {
          return (
            <div className={style.item} key={index}>
              <div>{product.id}</div>
              <div>{product.point}P</div>
              <div>{product.price}원</div>
              <div>
                <button onClick={() => chargePoint(product)}>충전하기</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={style.charge}>
        <span>현재 포인트 : {point}P</span>
      </div>
    </div>
  );
}
