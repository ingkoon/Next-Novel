import './App.css';
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import AppBar from "./components/AppBar";
import Card from './components/Card'

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppBar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>

  );
}

export default App;
