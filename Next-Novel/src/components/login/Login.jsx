import style from "./login.module.css"


export default function Login() {

  function kakaoLogin() {
    const { Kakao } = window
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_API,
      // prompts : "login" //항상 로그인을 하게 만드는거임.
    })
  }


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

          <div className={style.title}>
            안녕하세요 <br />
            넥스트노벨입니다.
          </div>

          <div className={style.subtitle}>
            회원 서비스 이용을 위해 로그인 해주세요.
          </div>

          <img
            onClick={kakaoLogin}
            className={style.kakao}
            src={process.env.PUBLIC_URL + "/img/kakao_login.png"}
          />
        </div>
        <div className={style.leftborder} />
      </div>
      <div className={style.bottomborder}>
        <div className={style.bottomleft} />
        <div className={style.bottomright} />
      </div>

      <span className={style.welcome}>WELCOME</span>
    </div>
  )
}
