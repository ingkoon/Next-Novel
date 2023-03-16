import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./pages/ProtectedRoute";
import Novels from "./pages/Novels";
import NovelIntro from "./pages/NovelIntro";
import NovelRead from "./pages/NovelRead";
import NovelSearch from "./pages/NovelSearch";
import MyPage from "./pages/MyPage";
import NovelWrite from "./pages/NovelWrite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
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
        path: "/mypage",
        element: (
          // <ProtectedRoute>
          <MyPage />
          // </ProtectedRoute>
        ),
      },
      {
        path: "/laboratory",
        element: (
          // <ProtectedRoute>
          <NovelWrite />
          // </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
