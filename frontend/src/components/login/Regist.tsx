import { useState } from "react";
import style from "./Regist.module.css";
import useUser from "../../hooks/useUser";

type RegistProps = {
  move: () => void;
};
export default function Regist({ move }: RegistProps) {
  const { normalRegist, nickNameCheck, emailCheck } = useUser();
  const [info, setInfo] = useState({
    nickName: "",
    email: "",
    pw1: "",
    pw2: "",
  });
  const [nickNameCheckState, setNickNameCheckState] = useState("");
  const [emailCheckState, setEmailCheckState] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nickName") {
      setNickNameCheckState("");
    } else if (name === "email") {
      setEmailCheckState("");
    }
    setInfo({ ...info, [name]: value });
  };
  const check = (what: string) => {
    if (what === "nickName") {
      if (info.nickName.length === 0) {
        alert("닉네임을 확인해주세요!");
        return;
      }
      nickNameCheck.mutate(
        { nickName: info.nickName },
        {
          onSuccess: (res) => {
            console.log(res);
            if (res.data.result === "fail") {
              alert(res.data.message);
            }
            setNickNameCheckState(res.data.result);
          },
        }
      );
    }
    if (what === "email") {
      if (info.email.length === 0 || info.email.indexOf("@") < 0) {
        alert("이메일을 확인해주세요!");
        return;
      }
      emailCheck.mutate(
        { email: info.email },
        {
          onSuccess: (res) => {
            console.log(res);
            if (res.data.result === "fail") {
              alert(res.data.message);
            }
            setEmailCheckState(res.data.result);
          },
        }
      );
    }
  };

  const handleSubmit = () => {
    if (!(nickNameCheckState === "success" && emailCheckState === "success")) {
      alert("중복확인을 해주세요!");
      return;
    }
    if (info.pw1 !== info.pw2 || info.pw1.length === 0) {
      alert("비밀번호를 확인해주세요!");
      return;
    }

    const jsonData = {
      email: info.email,
      password: info.pw1,
      nickName: info.nickName,
    };

    normalRegist.mutate(jsonData, {
      onSuccess: (res) => {
        console.log(res);
        move();
      },
    });
  };

  return (
    <div
      className={style.loginmodal}
      style={{
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
            <img
              src={process.env.PUBLIC_URL + "/img/NN_LOGO_text.svg"}
              alt="logo"
            />
          </div>

          <div className={style.form}>
            <div className={style.inputBox}>
              <input
                type="text"
                value={info.nickName}
                name="nickName"
                onChange={handleChange}
                placeholder="닉네임"
              />
              <button
                className={`${style.checkButton} ${style[nickNameCheckState]}`}
                onClick={() => check("nickName")}
              >
                중복확인
              </button>
            </div>
            <div className={style.inputBox}>
              <input
                type="text"
                value={info.email}
                name="email"
                onChange={handleChange}
                placeholder="이메일"
              />
              <button
                className={`${style.checkButton} ${style[emailCheckState]}`}
                onClick={() => check("email")}
              >
                중복확인
              </button>
            </div>

            <input
              type="password"
              value={info.pw1}
              name="pw1"
              onChange={handleChange}
              placeholder="비밀번호"
            />
            <input
              type="password"
              value={info.pw2}
              name="pw2"
              onChange={handleChange}
              placeholder="비밀번호 확인"
            />

            <button className={style.submitButton} onClick={handleSubmit}>
              가입하기
            </button>
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
