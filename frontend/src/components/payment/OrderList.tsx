import React, { useEffect, useState } from "react";
import style from "./OrderList.module.css";
import usePayment from "../../hooks/usePayment";

type OrderType = {
  id: number;
  point: number;
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
    { id: 0, point: 500, price: 5000, receiptId: "644a307d966b740020754edc" },
    {
      id: 0,
      point: 10000,
      price: 100000,
      receiptId: "644a307d966b740020754edc",
    },
    { id: 0, point: 1000, price: 10000, receiptId: "644a307d966b740020754edc" },
    { id: 0, point: 5000, price: 50000, receiptId: "644a307d966b740020754edc" },
  ];

  return (
    <div className={style.container}>
      <div className={style.list}>
        <div className={style.listTitle}>포인트 내역</div>
        {tempData.map((order, index) => {
          return (
            <div className={style.item} key={index}>
              <div className={style.itemLeft}>
                <div>주문번호 : {order.receiptId}</div>
                <div>결제금액 : {order.price}원</div>
              </div>
              <div className={style.itemRight}>+ {order.point}P</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
