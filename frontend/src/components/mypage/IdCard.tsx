import style from "./IdCard.module.css";
import Member from "./Member";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import usePayment from "../../hooks/usePayment";
import { useNavigate } from "react-router-dom";

export default function IdCard() {
  const [userinfo, setUserinfo] = useState({
    profile_image: "",
    nickName: "",
    createdAt: "",
  });
  const { getUserInfo } = useUser();
  const { getPoint } = usePayment();
  const [point, setPoint] = useState();
  const navigate = useNavigate();

  // api 통신하기
  async function getuser() {
    try {
      const res = await getUserInfo();
      console.log(res);
      setUserinfo({
        profile_image:
          process.env.REACT_APP_MEMBER_IMAGE_API + res.data.profileImage,
        nickName: res.data.nickName,
        createdAt: res.data.createdAt.substring(0, 10),
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function getPointAsync() {
    try {
      const res = await getPoint();
      console.log(res);
      setPoint(res.data.point);
    } catch (e) {
      console.log(e);
    }
  }

  const updatemember = () => {
    getuser();
  };

  // api 호출하기
  useEffect(() => {
    getuser();
    getPointAsync();
  }, []);

  return (
    <div className={style.mypagewhole}>
      <div className={style.mypage}>
        <div className={style.left}>
          <div className={style.pic}>
            <div className={style.pictxt}>profile_pic</div>
            <div className={style.linehor} />
          </div>
          <div className={`${style.circle} ${style.one}`} />
          <div className={style.pic}>
            <div>reg_date</div>
            <div className={style.line} />
          </div>
          <div className={`${style.circle} ${style.two}`} />
        </div>

        <div className={style.idcard}>
          <div className={style.cardtop}>
            <div className={style.cardtopcircle} />
            <div className={style.cardtopclip} />
            <div className={style.cardtopbase} />
          </div>
          <div className={style.cardmiddle}>
            <div className={style.cardmiddlebase}>
              <div className={style.info_top}>
                <div className={style.info_nn}>Next Novel Lab</div>
                <div className={style.info_img}>
                  <img src={userinfo.profile_image} alt="profile_image" />
                  <div className={style.logo}>
                    <img
                      src={process.env.PUBLIC_URL + "icon/logo_color.svg"}
                      alt="logo_color"
                    />
                    <img
                      src={process.env.PUBLIC_URL + "img/logo_circle.svg"}
                      alt="logo_circle"
                    />
                  </div>
                </div>
              </div>

              <div className={style.info_bottom}>
                <div className={style.info_title}>CREATOR</div>
                <div className={style.info_bottom2}>
                  <div className={style.info_sub}>
                    <div className={style.info_name}>
                      ID {userinfo.nickName}
                    </div>
                    <div className={style.info_date}>
                      S/N {userinfo.createdAt}
                    </div>
                  </div>
                  <div
                    className={style.info_point}
                    onClick={() => navigate(`/payment`)}
                  >
                    ▸ {point} P
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.right}>
          <div className={style.circlegroup}>
            <div />
            <div className={`${style.circle} ${style.three}`} />
            <div className={`${style.circle} ${style.four}`} />
            <div className={`${style.circle} ${style.five}`} />
            <div className={`${style.circle} ${style.six}`} />
            <div />
          </div>

          <div className={style.circlegroup3} style={{ width: "165px" }}>
            <div />
            <div className={style.diag} />
            <div className={style.diag} />
            <div className={style.diag} />
            <div className={style.diag2} />
          </div>

          <div className={style.circlegroup2}>
            {/* <div></div> */}
            <div>
              <div>division</div>
              <div className={style.horline} />
            </div>
            <div>
              <div>authority</div>
              <div className={style.horline} />
            </div>
            <div>
              <div>user_name</div>
              <div className={style.horline} />
            </div>
            <div>
              <div>nationality</div>
              <div className={style.horline} />
            </div>
          </div>
        </div>

        <img
          src={process.env.PUBLIC_URL + "/img/circles_right_top.svg"}
          className={style.circles}
          alt="circles"
        />
      </div>

      <Member updatemember={updatemember} />
    </div>
  );
}
