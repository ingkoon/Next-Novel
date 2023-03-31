import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({user : {access_token : '', refresh_token : ''}, setUser : ()=> {}});

// export function AuthContextProvider({ children }) {
//   const [user, setUser] = useState();

//   useEffect(() => {
//     //처음에만 사용자의 세션 정보가 남아있다면 state에 로그인 정보 저장
//     // onUserStateChange((user) => setUser(user)); //api호출
//     // onUserStateChange((user) => setUser(user));
//     setUser(user)
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// }

export function AuthContextProvider({children}) {
  const setUser = (data) => {
    setState(prevState => (
      {
        ...prevState,
        user : data
      }
    ))
  }

  const initState = {
    user : {'access_token' : '', 'refresh_token':'', 'nickname':''},
    setUser
  }
  const [state, setState] = useState(initState);
  return (
    <AuthContext.Provider value={ state }>{children}</AuthContext.Provider>
  )
}

// export function useAuthContext() {
//   return useContext(AuthContext);
// }
