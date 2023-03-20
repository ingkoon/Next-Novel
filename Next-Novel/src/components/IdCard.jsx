import './IdCard.module.css'

export default function IdCard(){
  return (
    <div>
      <div className='cardtop'>
        <div className='cardtopcircle'></div>
        <div className='cardtopclip'></div>
        <div className='cardtopbase'></div>
      </div>
      <div className='cardmiddle'>
        <div className='cardmiddlebase'>
          <div className='line'></div>
        </div>
      </div>
    </div>
  )
}