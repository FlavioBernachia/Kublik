import Checkout from "@/components/checkout/checkout";
import Header from "@/components/header/header";
import React from "react";


const checkoutPage: React.FC = () => {
  return (
    <>
    <Header/>
    <Checkout />
    </>
  );
};

export default checkoutPage;