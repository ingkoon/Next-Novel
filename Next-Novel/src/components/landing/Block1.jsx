import { useEffect } from 'react';
import style from './Block1.module.css';


export default function Block1(){

    useEffect(() =>{
        
        const p = document.querySelector('p');
        function textDisplay(element){

            const textArray = element.innerText.split('');
            const special = ['@', 'S', '#', 'I', '?', 'X', '!', 'G', '&', 'O', '%', 'D'];
            const exception = [' ', '\n', '.', ',', ':',  ')'];
            const randomIntBetween = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1));
            }

            const numArray = [];
            textArray.forEach(_ => {
                const num = randomIntBetween(5, 40);
                numArray.push(num);
            });

            let newText;
            let completeCount;
            const timer = setInterval(() => {
                completeCount = 0;
                newText='';
                numArray.forEach((num, i) => {
                    if (exception.includes(textArray[i]) || numArray[i] === 0) {
                        newText += textArray[i];
                        completeCount += 1;
                    } else{
                        newText += special[numArray[i] % special.length];
                        numArray[i] = --num;
                    }
                })

                element.innerText = newText;
                if (completeCount === numArray.length) {
                    clearInterval(timer);
                }
            }, 100);
        }

        textDisplay(p);
    }, []);

    const goNext = () => {
        window.scrollTo({ top: 722, behavior: 'smooth' });
    }


    return(
        <div className={style.block}>
            <div className={style.presents}>
                6G PRESENTS...
                <div className={style.bar}></div>
            </div>
            <div>
                <img src={process.env.PUBLIC_URL+'/img/NN_LOGO_text.svg'} className={style.logo} alt='NN_LOGO_text'></img>
            </div>
            <p className={style.par}>
                넥스트노벨에 오신것을 환영합니다.<br /><br />
                AN EXPERIENCE OF COLLABORATION<br />    
                BETWEEN HUMAN IMAGINATION AND<br /> 
                ARTIFICIAL INTELLIGENCE
            </p>
            <div className={style.next} onClick={goNext}>
                <div className={style.slide}></div>
            </div>
        </div>
    )
}