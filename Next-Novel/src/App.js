import "./App.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import AppBar from "./components/common/AppBar";
import style from "./mobile.module.css";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <div className={style.overlay}>더 넓은 화면으로 조정하세요!</div>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <AppBar />
          <Outlet />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
