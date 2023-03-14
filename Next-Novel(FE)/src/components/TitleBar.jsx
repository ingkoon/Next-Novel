import './TitleBar.css'

function TitleBar(){
  return (
    <div className='titlebar'>
      <div style={{margin:'10px'}}>
        <div className='title'>
          <div className='maintitle'>
            「도서관」
            <span className='subtitle'>도서관에서는 정숙해주시기 바랍니다.</span>
          </div>
        </div>
        <div style={{marginLeft:'10%'}}>
          <div>li-brary</div>
          <div>to-sho-ken</div>
        </div>
      </div>
      <img src={process.env.PUBLIC_URL+'/icon/banner/banner_library.svg'}></img>
    </div>
  )
}

export default TitleBar;