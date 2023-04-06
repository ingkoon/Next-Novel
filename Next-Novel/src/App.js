import "./App.css";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import AppBar from "./components/common/AppBar";
import style from "./mobile.module.css";
import TagManager from "./module";

const queryClient = new QueryClient();
const tagManager = new TagManager('http://ec2-3-38-85-143.ap-northeast-2.compute.amazonaws.com/api/v1/dump', "1d08756c-9039-4595-934b-71100ef08795", ['click'])
function App() {
  const location = useLocation()
  useEffect(() => {
    tagManager.attach();
    return () => {
      tagManager.detach();
    }
  }, [location])
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
