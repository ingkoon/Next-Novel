import React from "react"
import { Link } from "react-router-dom"

export default function Home() {
  // const location = useLocation()

  // const {user, setUser } = useContext(AuthContext);
  // useEffect(() => {
  //   const urlSearchParams = new URLSearchParams(location.search)
    
  //   if (urlSearchParams.has("code")) {
  //     // If "code" exists, execute some logic
  //     const code = urlSearchParams.get("code")
  //     console.log("Code exists:", code)
  //     axios({
  //       method: "get",
  //       url: process.env.REACT_APP_DATA_API+"user/kakao/callback/",
  //       params: {
  //         code: code,
  //       },
  //     }).then((res) => {
  //       console.log(res)
  //       const accessToken = res.data.access_token
  //       const refreshToken = res.data.refresh_token
  //       const nickname = res.data.user.nickname
  //       localStorage.setItem("access_token", accessToken)
  //       localStorage.setItem("refresh_token", refreshToken)
  //       setUser({access_token : accessToken, refresh_token : refreshToken, nickname: nickname})
  //     })
  //     // ... add your logic here
  //   } else {
  //     // If "code" does not exist, execute some other logic
  //     console.log("Code does not exist")

  //     // ... add your logic here
  //   }
  // }, [location])



  return (
    <>
      <h1>Home - 임시 링크</h1>
      <Link to="/">
        <h2>Home</h2>
      </Link>
      <Link to="/library">
        <h2>도서관</h2>
      </Link>
      <Link to="/library/search">
        <h2>검색페이지</h2>
      </Link>
      <Link to="/library/intro">
        <h2>책인트로</h2>
      </Link>
      <Link to="/library/read">
        <h2>책읽기</h2>
      </Link>
      <Link to="/mypage">
        <h2>마이페이지</h2>
      </Link>
      <Link to="/laboratory">
        <h2>책제작페이지</h2>
      </Link>
      <Link to="/landing">
        <h2>랜딩페이지</h2>
      </Link>
      
    </>
  )
}
