import React, { useEffect, useState } from "react";
import style from "./ProductList.module.css";
import usePayment from "../../hooks/usePayment";

type ProductType = {
  id: number;
  items: string;
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

  const tempData = [
    { id: 0, items: "50P" },
    { id: 0, items: "50P" },
    { id: 0, items: "50P" },
    { id: 0, items: "50P" },
  ];

  return (
    <div className={style.container}>
      <div className={style.list}>
        {tempData.map((product, index) => {
          return (
            <div className={style.item} key={index}>
              <div>{product.id}</div>
              <div>{product.items}</div>
            </div>
          );
        })}
      </div>
      <div className={style.charge}>
        <span>{point}P</span>
        <button onClick={createOrder}>충전하기</button>
      </div>
    </div>
  );
}
