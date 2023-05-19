import React, { useEffect, useState } from "react";
import style from "./ProductList.module.css";
import usePayment from "../../hooks/usePayment";
import { CreateOrder } from "../../types/payment";
import BootPay from "bootpay-js";

type ProductType = {
  id: number;
  items: string;
  point: number;
  price: number;
};

export default function ProductList() {
  const { getProductList, createOrder, getPoint } = usePayment();
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [point, setPoint] = useState();
  const [selectedOption, setSelectedOption] = useState<ProductType>();

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
      setSelectedOption(res.data[0]);
    } catch (e) {
      console.log(e);
    }
  }

  async function openBootpayAsync() {
    BootPay.request({
      application_id: process.env.REACT_APP_PAYMENT_KEY,
      price: selectedOption!.price, //실제 결제되는 가격
      name: selectedOption!.point + "P", //결제창에서 보여질 이름
      order_id: "order_id_1234", //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
      pg: "",
      method: "card", //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
      show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
      // items: [
      //   {
      //     item_name: "나는 아이템", //상품명
      //     qty: 1, //수량
      //     unique: "123", //해당 상품을 구분짓는 primary key
      //     price: 1000, //상품 단가
      //     cat1: "TOP", // 대표 상품의 카테고리 상, 50글자 이내
      //     cat2: "티셔츠", // 대표 상품의 카테고리 중, 50글자 이내
      //     cat3: "라운드 티", // 대표상품의 카테고리 하, 50글자 이내
      //   },
      // ],
      // user_info: {
      //   username: "사용자 이름",
      //   email: "사용자 이메일",
      //   addr: "사용자 주소",
      //   phone: "010-1234-4567",
      // },
    })
      .error(function(data: any) {
        //결제 진행시 에러가 발생하면 수행됩니다.
        console.log(data);
      })
      .cancel(function(data: any) {
        //결제가 취소되면 수행됩니다.
        console.log(data);
      })
      .ready(function(data: any) {
        // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
        console.log(data);
      })
      .confirm(function(data: any) {
        //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
        //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
        console.log(data);
        var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
        if (enable) {
          BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
        } else {
          BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
        }
      })
      .close(function(data: any) {
        // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
        console.log(data);
      })
      .done(function(data: any) {
        // 결제가 모두 완료되었을 때 호출되는 함수입니다.
        console.log(data);

        const jsonData: CreateOrder = {
          memberId: localStorage.getItem("memberId")!,
          itemId: selectedOption!.id,
          price: selectedOption!.price,
          receiptId: data.receipt_id,
        };
        createOrderAsync(jsonData);
      });
  }

  async function createOrderAsync(jsonData: CreateOrder) {
    try {
      const res = await createOrder(jsonData);
      console.log(res);
      window.location.reload(); //새로고침
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.infoTitle}>보유 포인트</div>
        <div className={style.infoPoint}>{point}P</div>
      </div>
      <div className={style.list}>
        <div className={style.listTitle}>충전할 포인트</div>
        {productList.map((product, index) => {
          return (
            <div
              className={`${style.item} ${
                selectedOption && selectedOption.id === product.id
                  ? style.selected
                  : ""
              }`}
              key={index}
              onClick={() => setSelectedOption(product)}
            >
              <div className={style.point}>{product.point}P</div>
              <div className={style.price}>{product.price}원</div>
            </div>
          );
        })}
        <div className={style.listDesc}>
          충전 후 예상 보유 포인트 :{" "}
          {point && selectedOption ? point + selectedOption.point : undefined}P
        </div>
        <button className={style.payButton} onClick={openBootpayAsync}>
          결제하기
        </button>
      </div>
    </div>
  );
}
