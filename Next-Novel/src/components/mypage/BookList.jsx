import Card from '../common/Card'
import style from './BookList.module.css'

export default function BookList(){

  let arr = []
  for(let i=0;i<4;i++){
    arr.push(Card)
  }

  return (
    <div>
      <div className={style.cardlist}>
        {arr.map((Component, index) => (
          <Component key={index} className={style.cardcompo}/>
        ))}
      </div>
    </div>
  )
}