import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AfterStartWrite from "../components/novelwrite/AfterStartWrite";
import BeforeStartWrite from "../components/novelwrite/BeforeStartWrite";
import { NovelContextProvider } from "../context/NovelContext";

export default function NovelWrite() {
  const { state } = useLocation();
  const [order, setOrder] = useState("before");

  useEffect(() => {
    setOrder("before");
  }, [state]);

  return (
    <>
      {order === "before" ? (
        <BeforeStartWrite setOrder={setOrder} />
      ) : (
        <NovelContextProvider>
          <AfterStartWrite />
        </NovelContextProvider>
      )}
    </>
  );
}
