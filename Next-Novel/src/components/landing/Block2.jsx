import style from './Block2.module.css';
import { ReactComponent as Nsvg } from './N.svg';
import { ReactComponent as Elsvg } from './El.svg';
import { ReactComponent as Xsvg } from './X.svg';
import { ReactComponent as Tsvg } from './T.svg';
import { ReactComponent as Osvg } from './O.svg';
import { ReactComponent as Vsvg } from './V.svg';
import { ReactComponent as Esvg } from './E.svg';
import { ReactComponent as Lsvg } from './L.svg';

export default function Block2(){

    return(
        <div className={style.block}>
            <div>
                <div className={style.topDiv}>
                    <div className={style.tlblock}></div>
                    <Nsvg className={style.topN} />
                    <Elsvg className={style.topE} />
                    <Xsvg className={style.topX} />
                    <Tsvg className={style.topT} />
                    <div className={style.trblock}></div>
                </div>
                <br /><br /><br />
                <div className={style.botDiv}>
                    <div className={style.blblock}></div>
                    <Nsvg className={style.botN} />
                    <Osvg className={style.botO} />
                    <Vsvg className={style.botV} />
                    <Esvg className={style.botE} />
                    <Lsvg className={style.botL} />
                    <div className={style.brblock}></div>
                </div>
            </div>
        </div>
    )
}