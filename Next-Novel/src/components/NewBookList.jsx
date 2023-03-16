import './NewBookList.scoped.css'
import NewCard from "../components/NewCard";

export default function NewBookList() {
  return (
    <div className='newbooklist'>
      <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className='circle_left' ></img>
      <NewCard/>
      <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className='circle_right' ></img>
    </div>
  )
}