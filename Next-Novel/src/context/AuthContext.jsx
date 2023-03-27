import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    //처음에만 사용자의 세션 정보가 남아있다면 state에 로그인 정보 저장
    // onUserStateChange((user) => setUser(user)); //api호출
    // onUserStateChange((user) => setUser(user));
    setUser(user)
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
