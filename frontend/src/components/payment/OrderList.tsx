import React, { useEffect, useState } from "react";
import style from "./OrderList.module.css";
import usePayment from "../../hooks/usePayment";

type OrderType = {
  orderId: number;
  point: number;
  price: number;
  receiptId: string;
};
export default function OrderList() {
  const { getPoint, getOrderList, cancelOrder } = usePayment();
  const [orderList, setOrderList] = useState<OrderType[]>([]);

  useEffect(() => {
    getOrderListAsync();
  }, []);

  async function getPointAsync() {
    try {
      const res = await getPoint();
      console.log(res);
      return res.data.point;
    } catch (e) {
      console.log(e);
    }
  }

  async function getOrderListAsync() {
    try {
      const res = await getOrderList();
      console.log(res);
      setOrderList(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  async function cancelOrderAsync(order: OrderType) {
    const point = await getPointAsync();
    if (point < order.point) {
      alert("보유한 포인트가 주문 취소할 포인트의보다 적어 환불 불가능합니다");
      return;
    }

    try {
      const res = await cancelOrder(order.orderId);
      console.log(res);
      window.location.reload(); //새로고침
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
              <div className={style.itemRight}>
                <div>+ {order.point}P</div>
                <div onClick={() => cancelOrderAsync(order)}>주문 취소</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
