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

  return (
    <div className={style.container}>
      <div className={style.list}>
        <div className={style.listTitle}>포인트 내역</div>
        {orderList.length === 0 && <div>결제 내역이 없습니다</div>}
        {orderList.map((order, index) => {
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
