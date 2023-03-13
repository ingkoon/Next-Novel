<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import AppBar from '../src/components/AppBar'
import Card from '../src/components/Card'
=======
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import AppBar from "./components/AppBar";
>>>>>>> 90851266c3ef6192089a2ea18e60c5b8a5483b55

const queryClient = new QueryClient();
function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <AppBar></AppBar>
      <Card></Card>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <AppBar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
>>>>>>> 90851266c3ef6192089a2ea18e60c5b8a5483b55
  );
}

export default App;
