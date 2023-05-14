import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import NotFound from "./pages/NotFound";
import Novels from "./pages/Novels";
import NovelIntro from "./pages/NovelIntro";
import NovelRead from "./pages/NovelRead";
import NovelSearch from "./pages/NovelSearch";
import MyPage from "./pages/MyPage";
import NovelWrite from "./pages/NovelWrite";
import Landing from "./pages/Landing";
import Payment from "./pages/Payment";
import Test from "./pages/Test";
import OnlyLogin from "./components/login/OnlyLogin";
import Modal from "react-modal";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Landing /> },
      {
        path: "/login",
        element: <OnlyLogin />,
      },
      {
        path: "/library",
        element: <Novels />,
      },
      {
        path: "/library/:id/intro",
        element: <NovelIntro />,
      },
      {
        path: "/library/:id/read",
        element: <NovelRead />,
      },
      {
        path: "/library/search",
        element: <NovelSearch />,
      },
      {
        path: "/laboratory",
        element: <NovelWrite />,
      },
      {
        path: "/mypage",
        element: <ProtectedRoute component={MyPage} />,
      },
      {
        path: "/payment",
        element: <ProtectedRoute component={Payment} />,
      },
      {
        path: "/test",
        element: <Test width={600} height={380} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById(
  "root"
) as HTMLElement);
root.render(
  // <React.StrictMode>

  <RouterProvider router={router} />

  // </React.StrictMode>
);

Modal.setAppElement("#root");
