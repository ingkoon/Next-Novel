import style from './Update.module.css'
import React, { useState, useRef } from "react"

export default function Update({closemodal}){

  const [imgFile, setImgFile] = useState("")
  const [nickName, setNickName] = useState("테스트계정")
  const imgRef = useRef()

  const saveImgFile = () => {
    const file = imgRef.current.files[0]
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
          <img src={imgFile ? imgFile : process.env.PUBLIC_URL+'img/tmp/girl2.jpg'} alt='updateprofile' onClick={changeprofile}></img>
        </label>
        <div className={style.regdate}>2023.03.09</div>
      </div>

      <div className={style.updatebtn}>
        <button>확인</button>
      </div>

      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} alt='circles_left'></img>
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} alt='circles_right'></img>
      <input id='inputimg' className={style.inputimg} type='file' accept='image/*' onChange={saveImgFile} ref={imgRef}></input>
    </div>
  )
}