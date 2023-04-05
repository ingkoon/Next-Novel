import axios from "axios"
import { useEffect, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { AuthContext } from "../../context/AuthContext"

export default function OnlyLogin() {
  const location = useLocation()
  const navigate = useNavigate()

  const {user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search)
    
    if (urlSearchParams.has("code")) {
      // If "code" exists, execute some logic
      const code = urlSearchParams.get("code")
      console.log("Code exists:", code)
      axios({
        method: "get",
        url: process.env.REACT_APP_DATA_API+"user/kakao/callback/",
        params: {
          code: code,
        },
      }).then((res) => {
        console.log(res)
        const accessToken = res.data.access_token
        const refreshToken = res.data.refresh_token
        const nickname = res.data.user.nickname
        localStorage.setItem("access_token", accessToken)
        localStorage.setItem("refresh_token", refreshToken)
        localStorage.setItem("nickname", nickname)
        setUser({access_token : accessToken, refresh_token : refreshToken, nickname: nickname})
      })
      


    } else {
      // If "code" does not exist, execute some other logic
      console.log("Code does not exist")

      // ... add your logic here
    }

    const navigateToHome = () => {
      navigate('/')
    }

    navigateToHome()
  }, [location])

  return (
    <></>
  )
}