import style from './Materials.module.css';

export default function Materials({mat}) {

    return (
        <div className={style.wrapper}>
            <div className={style.what}>
                {mat.images.map((item) => {

                    return <>          
                        <div className={style.pic}>
                            <div className={style.inpic}>
                                <img src={item.image} alt="" />
                            </div>
                            <div className={style.caption}>{item.caption}</div>
                        </div>
                    </>

                })}
            </div>
        </div>
  )
}