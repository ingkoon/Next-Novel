import style from './GoToTop.module.css'

export default function GoToTop(){

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={style.gotop} onClick={goTop}>
      <hr/>
      ↑맨위로
    </div>
  )
}