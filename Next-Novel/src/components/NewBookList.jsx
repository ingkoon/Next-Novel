import './NewBookList.scoped.css'
import NewCard from "../components/NewCard";

export default function NewBookList() {
  return (
    <div>
      {/* <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className='newcard_quote1' ></img> */}
      <NewCard/>
      {/* <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className='newcard_quote1' ></img> */}
    </div>
  )
}