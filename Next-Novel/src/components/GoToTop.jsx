import './GoToTop.module.css'

export default function GoToTop(){

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="gotop" onClick={goTop}>
      <hr/>
      ↑맨위로
    </div>
  )
}