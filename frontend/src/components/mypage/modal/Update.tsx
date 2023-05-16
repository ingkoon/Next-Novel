import style from "./Update.module.css";
import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import useUser from "../../../hooks/useUser";

type UpdateProps = {
  closemodal: () => void;
};
export default function Update({ closemodal }: UpdateProps) {
  const { getUserInfo, putUserInfo, nickNameCheck } = useUser();
  const [profile, setProfile] = useState(new File([], ""));
  const [nickName, setNickName] = useState("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [userinfo, setUserinfo] = useState({
    //서버에서 받은 정보
    profile_image: "",
    nickName: "",
    createdAt: "",
  });
  const [nickNameCheckState, setNickNameCheckState] = useState("success");

  // api 통신하기
  async function getuser() {
    try {
      const res = await getUserInfo();
      setUserinfo({
        profile_image:
          process.env.REACT_APP_MEMBER_IMAGE_API + res.data.profileImage,
        nickName: res.data.nickName,
        createdAt: res.data.createdAt.substring(0, 10),
      });
      setNickName(res.data.nickName);
    } catch (e) {
      console.log(e);
    }
  }

  // api 호출하기
  useEffect(() => {
    getuser();
  }, []);

  const saveImgFile = () => {
    const file =
      imgRef.current && imgRef.current.files && imgRef.current.files[0];

    if (file) {
      setProfile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const result = reader.result as string;
        setUserinfo({ ...userinfo, profile_image: result });
      };
    }
  };

  const changeprofile = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    document.getElementById("inputimg")!.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickNameCheckState("");
    setNickName(e.target.value);
  };

  const updateuser = () => {
    if (!(nickNameCheckState === "success")) {
      alert("중복확인을 해주세요!");
      return;
    }

    const formData = new FormData();

    formData.append("multipartFile", profile);

    const json = {
      nickName: nickName,
    };
    formData.append(
      "request",
      new Blob([JSON.stringify(json)], { type: "application/json" })
    );

    putUserInfo.mutate(formData, {
      onSuccess: (res) => {
        console.log(res);
        closemodal();
      },
    });
  };
  const check = () => {
    //닉네임 미입력
    if (nickName.length === 0) {
      alert("닉네임을 확인해주세요!");
      return;
    }
    //현재 닉네임 입력
    if (nickName === userinfo.nickName) {
      setNickNameCheckState("success");
      return;
    }
    //닉네임 체크
    nickNameCheck.mutate(
      { nickName: nickName },
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
  };
  return (
    <div className={style.update}>
      <div className={style.close} onClick={() => closemodal()}>
        x
      </div>
      <div className={style.title}> &gt;_MEMBER INFO</div>

      <div className={style.category}>
        <div className={style.categoryTitle}>
          <div className={style.icon}>
            <img
              src={process.env.PUBLIC_URL + "/icon/mypage/nickName.svg"}
              alt="icon"
            />
          </div>
          <div className={style.categoryName}>닉네임</div>
        </div>
        <div className={style.categoryTitle}>
          <div className={style.icon}>
            <img
              src={process.env.PUBLIC_URL + "/icon/mypage/profile.svg"}
              alt="icon"
            />
          </div>
          <div className={style.categoryName}>프로필</div>
        </div>
        <div className={style.categoryTitle}>
          <div className={style.icon}>
            <img
              src={process.env.PUBLIC_URL + "/icon/mypage/regdate.svg"}
              alt="icon"
            />
          </div>
          <div className={style.categoryName}>가입일자</div>
        </div>
        <div className={style.nickName}>
          <input onChange={onChange} value={nickName} />
          <button
            className={`${style.checkButton} ${style[nickNameCheckState]}`}
            onClick={() => check()}
          >
            중복확인
          </button>
        </div>
        <label htmlFor="inputimg" className={style.profile}>
          <img
            src={userinfo.profile_image}
            alt="updateprofile"
            onClick={changeprofile}
          />
        </label>
        <div className={style.regdate}>{userinfo.createdAt}</div>
      </div>

      <div className={style.updatebtn}>
        <button onClick={updateuser}>확인</button>
      </div>

      <img
        src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
        className={style.circle_left}
        alt="circles_left"
      />
      <img
        src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
        className={style.circle_right}
        alt="circles_right"
      />
      <input
        id="inputimg"
        className={style.inputimg}
        type="file"
        accept="image/*"
        onChange={saveImgFile}
        ref={imgRef}
      />
    </div>
  );
}
