import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  component: React.ComponentType<any>;
};

export default function ProtectedRoute({
  component: Component,
}: ProtectedRouteProps) {
  if (localStorage.getItem("access_token")) {
    return <Component />;
  } else {
    alert("로그인이 필요한 서비스 입니다");
    return <Navigate to="/" />;
  }
}
