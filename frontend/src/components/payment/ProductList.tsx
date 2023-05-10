import React, { useEffect, useState } from "react";
import style from "./ProductList.module.css";
import usePayment from "../../hooks/usePayment";

type ProductType = {
  id: number;
  items: string;
};
export default function ProductList() {
  const { getProductList } = usePayment();
  const [productList, setProductList] = useState<ProductType[]>([]);

  useEffect(() => {
    getProductListAsync();
  }, []);

  async function getProductListAsync() {
    try {
      const res = await getProductList();
      console.log(res);
      setProductList(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={style.container}>
      {productList.map((product, index) => {
        return (
          <div>
            <span>{product.id}</span>
            <span>{product.items}</span>
          </div>
        );
      })}
    </div>
  );
}
