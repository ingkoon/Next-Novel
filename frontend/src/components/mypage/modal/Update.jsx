import style from './Update.module.css'
import React, { useState, useRef, useEffect, useContext } from "react"
import {patchuser, getuserinfo} from "../../../api/user"
import {AuthContext} from "../../../context/AuthContext"

export default function Update({closemodal}){

  const [imgFile, setImgFile] = useState("")
  const [nickName, setNickName] = useState("")
  const [profile, setProfile] = useState()
  const imgRef = useRef()
  const [userinfo, setUserinfo] = useState()
  const { user, setUser } = useContext(AuthContext)

  // api 통신하기
  async function getuser() {
    try {
      const data = await getuserinfo()
      let tmp = data.data.created_at
      let year = tmp.substring(0, 4)
      let month = tmp.substring(5,7)
      let day = tmp.substring(8,10)
      setNickName(data.data.nickname)
      setImgFile(data.data.profile_image)
      setUserinfo(year+'.'+month+'.'+day)
    }
    catch(e) {
      console.log(e)
    }
  }

  // api 호출하기
  useEffect(() => {
    getuser()
  }, [])


  const saveImgFile = () => {
    const file = imgRef.current.files[0]
    setProfile(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImgFile(reader.result)
    }

  }

  const changeprofile = () => {
    const inputimg = document.querySelector('#profileimg')
    inputimg.click()
  }

  const onChange = (e) => {
    setNickName(e.target.value)
  }

  const updateuser = () => {

    const formData = new FormData()

    if(profile !== undefined) {
      formData.append('profile_image', profile)
    }
    formData.append('nickname', nickName)


    async function updateuserinfo(){
      try {
        const data = await patchuser(formData)
        console.log(data)

        localStorage.setItem('nickname', nickName)
        closemodal()
      }
      catch(e) {
        console.log(e)
      }
    }

    updateuserinfo()
  }

  return (
    <div className={style.update}>
      <div className={style.close} onClick={()=> closemodal()}>x</div>
      <div className={style.title}> &gt;_MEMBER INFO</div>

      <div className={style.category}>
        <div>
          <div className={style.icon}>
            <img src={process.env.PUBLIC_URL + '/icon/mypage/nickname.svg'}></img>
          </div>
          <div>닉네임</div>
        </div>
        <div>
          <div className={style.icon}>
            <img src={process.env.PUBLIC_URL + '/icon/mypage/profile.svg'}></img>
          </div>
          <div>프로필</div>
        </div>
        <div>
          <div className={style.icon}>
            <img src={process.env.PUBLIC_URL + '/icon/mypage/regdate.svg'}></img>
          </div>
          <div>가입일자</div>
        </div>
        <div className={style.nickname}>
          <input onChange={onChange} value={nickName}></input>
        </div>
        <label htmlFor='inputimg' className={style.profile}>
          <img src={imgFile ? imgFile : '' } alt='updateprofile' onClick={changeprofile}></img>
        </label>
        <div className={style.regdate}>{userinfo}</div>
      </div>

      <div className={style.updatebtn}>
        <button onClick={updateuser}>확인</button>
      </div>

      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} alt='circles_left'></img>
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} alt='circles_right'></img>
      <input id='inputimg' className={style.inputimg} type='file' accept='image/*' onChange={saveImgFile} ref={imgRef}></input>
    </div>
  )
}