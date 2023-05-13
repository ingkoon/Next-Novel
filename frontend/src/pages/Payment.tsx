import React from "react";
import TitleBar from "../components/common/TitleBar";
import Footer from "../components/common/Footer";
import ProductList from "../components/payment/ProductList";
import OrderList from "../components/payment/OrderList";

export default function MyPage() {
  return (
    <>
      <TitleBar
        name="계정"
        intro="아, 오셨군요."
        subintro1="acc-ount"
        subintro2="aka-unto"
        img="idcard"
      />
      <ProductList />
      <OrderList />
      <Footer />
    </>
  );
}
