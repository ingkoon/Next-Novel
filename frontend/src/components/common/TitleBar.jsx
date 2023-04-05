import style from './TitleBar.module.css'

function TitleBar({name, intro, subintro1, subintro2, img}){
  return (
    <div className={style.titlebar}>
      <div style={{margin:'10px'}}>
        <div className={style.title}>
          <div className={style.maintitle}>
            「{name}」
            <span className={style.subtitle}>{intro}</span>
          </div>
        </div>
        <div style={{marginLeft:'10%'}}>
          <div>{subintro1}</div>
          <div>{subintro2}</div>
        </div>
      </div>
      <img style={ img === 'library' ? {} : {'transform':'rotate(-15deg)'}} src={process.env.PUBLIC_URL+'/icon/banner/'+img + '.svg'} alt='banner'/>
    </div>
  )
}

export default TitleBar;