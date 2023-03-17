import './Search.css'

export default function Search(){
  return (
    <div>
      <div className='searchpart'>
        <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className='circle_left' ></img>

        <div className='search'>
          <div>Q. 찾는 소설이 있으신가요?</div>
          <div className='form'>
            A.
            <input type='text' className='searchinput'/>
            <button className='searchbtn'> 제출 </button>
          </div>
        </div>
        <img src={process.env.PUBLIC_URL+'/img/searchpage.svg'} className='searchicon'/>
        <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className='circle_right' ></img>
      </div>
      <div className='search_result'>
        "@@@"에 대한 검색결과 :
      </div>
    </div>
  )
}