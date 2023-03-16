import './Booklist.css'
import Card from '../components/Card'

export default function Booklist(){

  let arr = []
  for(let i=0;i<4;i++){
    arr.push(Card)
  }

  return (
    <div>
      <hr className='line'></hr>
      <div className='list'>
        {arr.map((Component, index) => (
          <Component key={index}/>
        ))}
      </div>
    </div>
  )
}