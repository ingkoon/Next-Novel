import style from './Update.module.css'

export default function Update(){
  return (
    <div className={style.update}>
      <div className={style.title}> &gt;_MEMBER INFO</div>

      <div className={style.category}>
        <div>
          <div>아이콘</div>
          <div>닉네임</div>
        </div>
        <div>
          <div>아이콘</div>
          <div>프로필</div>
        </div>
        <div>
          <div>아이콘</div>
          <div>가입일자</div>
        </div>
      </div>

      <div className={style.value}>
        <div>테스트계정1</div>
        <div>이미지</div>
        <div>2023.03.09</div>
      </div>
    </div>
  )
}