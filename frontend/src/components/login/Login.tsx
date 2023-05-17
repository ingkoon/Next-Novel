import { ChangeEvent, useState } from "react";
import style from "./login.module.css";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

type LoginProps = {
  move: () => void;
  closemodal: () => void;
};
export default function Login({ move, closemodal }: LoginProps) {
  const { normalLogin } = useUser();
  const [info, setInfo] = useState({ email: "", pw: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = () => {
    if (info.email.length === 0 || info.pw.length === 0) {
      alert("이메일 또는 비밀번호를 입력해 주세요.");
    }
    const jsonData = { email: info.email, password: info.pw };
    normalLogin.mutate(jsonData, {
      onSuccess: (res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        localStorage.setItem("memberId", res.data.memberId);
        closemodal();
        navigate("/");
      },
      onError: (res) => {
        console.log(res);
        alert("이메일 또는 비밀번호를 확인해 주세요.");
      },
    });
  };
  const kakaoLogin = () => {
    window.location.href = process.env.REACT_APP_KAKAO_API!;
  };
  const googleLogin = () => {
    window.location.href = process.env.REACT_APP_GOOGLE_API!;
  };

  return (
    <div
      className={style.loginmodal}
      style={{
        // backgroundImage: `url('${process.env.PUBLIC_URL}/img/login_bg.jpg')`,
        backgroundImage: `url('${process.env.PUBLIC_URL}/img/login_bg.jpg')`,
      }}
    >
      <div className={style.topborder}>
        <div className={style.topleft} />
        <div className={style.topright} />
      </div>
      <div className={style.middleborder}>
        <div className={style.leftborder} />

        <div className={style.main}>
          <div className={style.loginlogo}>
            <img src={process.env.PUBLIC_URL + "/img/NN_LOGO_text.svg"} />
          </div>

          <div className={style.form}>
            <input
              type="text"
              value={info.email}
              name="email"
              onChange={handleChange}
              placeholder="이메일"
            />
            <input
              type="password"
              value={info.pw}
              name="pw"
              onChange={handleChange}
              placeholder="비밀번호"
            />
            <button onClick={handleSubmit}>로그인</button>
            <span onClick={move}>회원가입</span>
          </div>

          <div className={style.socialContainer}>
            <div className={style.socialGuide}>
              <hr className={style.socialLine} />
              <span className={style.socialTitle}>간편 로그인</span>
              <hr className={style.socialLine} />
            </div>

            <div className={style.socialButton}>
              <img
                src={process.env.PUBLIC_URL + "/icon/kakao.svg"}
                alt="login"
                onClick={kakaoLogin}
              />
              <img
                src={process.env.PUBLIC_URL + "/icon/google.svg"}
                alt="login"
                onClick={googleLogin}
              />
            </div>
          </div>
        </div>
        <div className={style.leftborder} />
      </div>
      <div className={style.bottomborder}>
        <div className={style.bottomleft} />
        <div className={style.bottomright} />
      </div>

      <span className={style.welcome}>WELCOME</span>
    </div>
  );
}
