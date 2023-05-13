import React, { useEffect, useState } from "react";
import style from "./OrderList.module.css";
import usePayment from "../../hooks/usePayment";

type OrderType = {
  id: number;
  price: number;
  receiptId: string;
};
export default function OrderList() {
  const { getOrderList } = usePayment();
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  useEffect(() => {
    getOrderListAsync();
  }, []);

  async function getOrderListAsync() {
    try {
      const res = await getOrderList();
      console.log(res);
      setOrderList(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const tempData = [
    { id: 0, price: 500, receiptId: "Fgkdfjkdfefjdk" },
    { id: 0, price: 500, receiptId: "Fgkdfjkdfefjdk" },
    { id: 0, price: 500, receiptId: "Fgkdfjkdfefjdk" },
    { id: 0, price: 500, receiptId: "Fgkdfjkdfefjdk" },
  ];

  return (
    <div className={style.container}>
      <div className={style.list}>
        {tempData.map((order, index) => {
          return (
            <div className={style.item} key={index}>
              <div>{order.id}</div>
              <div>{order.price}</div>
              <div>{order.receiptId}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
