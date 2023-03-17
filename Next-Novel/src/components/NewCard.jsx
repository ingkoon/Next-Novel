import './NewCard.scoped.css'

export default function NewCard(){
  return (
    <div className="newcard">
      <div className='img'>
        <img src={process.env.PUBLIC_URL+'/img/tmp/tmpimg2.png'}></img>
      </div>
      <div className='strip'>
        <div className='newcard_line'></div>
      </div>
      <div className='newcard_infopart'>
        <div style={{height:'50px', marginTop:'20px'}}>
          <div className='newcard_new'>
            NEW
          </div>
        </div>

        <div className='newcard_intro'>
          <div className='newcard_ment'>
            취미는 기타, 본업은 코딩 한 사내의 좌충우돌 개발자 생존기
          </div>
          <img src={process.env.PUBLIC_URL+'/icon/quote1_black.svg'} className='newcard_quote1' ></img>
          <img src={process.env.PUBLIC_URL+'/icon/quote2_black.svg'} className='newcard_quote2' ></img>
        </div>

        <div className='newcard_info'>
          <div className='newcard_title'>그냥, 취미해!</div>
          <div className='newcard_writer'>찰스</div>
          <div className='newcard_last'>
            <div className='newcard_date'>
              출간일 : 2023.03.08
            </div>
            <div style={{display:'flex', marginRight:'10px'}}>
              <img src={process.env.PUBLIC_URL+'/icon/heart_black.svg'} style={{margin:'auto 5px'}}></img>
              <div className='newcard_heart'>23</div>
              <img src={process.env.PUBLIC_URL+'/icon/comment_black.svg'} style={{margin:'auto 5px'}}></img>
              <div className='newcard_comment'>11</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}