import style from "./Update.module.css";
import React, { useState, useRef, useEffect, useContext, ChangeEvent } from "react";
import { patchuser, getuserinfo } from "../../../api/user";
import { AuthContext } from "../../../context/AuthContext";

type UpdateProps = {
  closemodal: () => void;
};
export default function Update({ closemodal }: UpdateProps) {
  const [imgFile, setImgFile] = useState("");
  const [nickName, setNickName] = useState("");
  const [profile, setProfile] = useState<File | undefined>();
  const imgRef = useRef<HTMLInputElement>(null);
  const [userinfo, setUserinfo] = useState("");
  const { user, setUser } = useContext(AuthContext);

  // api 통신하기
  async function getuser() {
    try {
      // const data = await getuserinfo();
      // let tmp = data.data.created_at;
      // let year = tmp.substring(0, 4);
      // let month = tmp.substring(5, 7);
      // let day = tmp.substring(8, 10);
      // setNickName(data.data.nickname);
      // setImgFile(data.data.profile_image);
      // setUserinfo(year + "." + month + "." + day);
      setNickName("서철원");
      setImgFile("http://placehold.it/150X150");
      setUserinfo("2023.04.05");
    } catch (e) {
      console.log(e);
    }
  }

  // api 호출하기
  useEffect(() => {
    getuser();
  }, []);

  const saveImgFile = () => {
    const file = imgRef.current?.files?.[0];
    
    if (file) {
      setProfile(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        const result = reader.result as string;
        setImgFile(result);
      };
    }
  };

  const changeprofile = () => {
    document.getElementById("inputimg")!.click();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const updateuser = () => {
    const formData = new FormData();

    if (profile !== undefined) {
      formData.append("profile_image", profile);
    }
    formData.append("nickname", nickName);

    async function updateuserinfo() {
      try {
        const data = await patchuser(formData);
        console.log(data);

        localStorage.setItem("nickname", nickName);
        closemodal();
      } catch (e) {
        console.log(e);
      }
    }

    updateuserinfo();
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
            <img src={process.env.PUBLIC_URL + "/icon/mypage/nickname.svg"} />
          </div>
          <div className={style.categoryName}>닉네임</div>
        </div>
        <div className={style.categoryTitle}>
          <div className={style.icon}>
            <img src={process.env.PUBLIC_URL + "/icon/mypage/profile.svg"} />
          </div>
          <div className={style.categoryName}>프로필</div>
        </div>
        <div className={style.categoryTitle}>
          <div className={style.icon}>
            <img src={process.env.PUBLIC_URL + "/icon/mypage/regdate.svg"} />
          </div>
          <div className={style.categoryName}>가입일자</div>
        </div>
        <div className={style.nickname}>
          <input onChange={onChange} value={nickName} />
        </div>
        <label htmlFor="inputimg" className={style.profile}>
          <img src={imgFile} alt="updateprofile" onClick={changeprofile} />
        </label>
        <div className={style.regdate}>{userinfo}</div>
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
