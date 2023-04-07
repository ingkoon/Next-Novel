import style from './Block3.module.css';
import { useEffect, useRef } from 'react';
import { ReactComponent as Draw1 } from './Draw1.svg';
import { ReactComponent as Draw2 } from './Draw2.svg';
import { ReactComponent as Draw3 } from './Draw3.svg';
// import { ReactComponent as Draw4 } from './Draw4.svg';

export default function Block3(){

const secondBlock = useRef(null);
const guideBlock = useRef(null);

  //first block
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
    secondBlock.current.scrollIntoView({ behavior: 'smooth' });
}

const goNext2 = () => {
    guideBlock.current.scrollIntoView({ behavior: 'smooth' });
}


//second block

    useEffect(() => {
      
        // Get the SVG paths and contents
        const path1 = document.querySelector(`.${style.svg2} path`);
        // const path2 = document.querySelector(`.${style.svg3} path`);
        // const path3 = document.querySelector(`.${style.svg4} path`);

        // Get the SVG paths and contents
        const content1 = document.querySelector('#content1');
        // const content2 = document.querySelector(`.${style.content2}`);
        // const content3 = document.querySelector(`.${style.content3}`);


        // Get the lengths of the SVG paths
        const path1Length = path1.getTotalLength();
        // const path2Length = path2.getTotalLength();
        // const path3Length = path3.getTotalLength();
    
        // Set the stroke dasharray and stroke dashoffset of the SVG paths
        path1.style.strokeDasharray = path1Length
        path1.style.strokeDashoffset = calcDashoffset(window.innerHeight * 0.8, content1, path1Length)
    
        // path2.style.strokeDasharray = path2Length
        // path2.style.strokeDashoffset = path2Length
    
        // path3.style.strokeDasharray = path3Length
        // path3.style.strokeDashoffset = path3Length
    
        // Define a custom function to calculate the stroke dashoffset
        function calcDashoffset(scrollY, element, length) {
          const ratio = (scrollY - element.offsetTop) / element.offsetHeight
          const value = length - (length * ratio)
          return value < 0 ? 0 : value > length ? length : value
        }
    
        // Define a scroll handler function
        function scrollHandler() {
          const scrollY = window.scrollY + (window.innerHeight * 0.8)
          path1.style.strokeDashoffset = calcDashoffset(scrollY, content1, path1Length)
          // path2.style.strokeDashoffset = calcDashoffset(scrollY, content2, path2Length)
          // path3.style.strokeDashoffset = calcDashoffset(scrollY, content3, path3Length)
        }
    
        // Add the scroll event listener
        window.addEventListener('scroll', scrollHandler)
    
        // Remove the scroll event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', scrollHandler)
        }
      }, []);

    return(
      <>
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
            <div className={style.gonext} onClick={goNext}>
                <div className={style.slidenext}></div>
            </div>
        </div>


        <div>
            <div className={style.header} ref={secondBlock}>
                <Draw1 className={style.svg1} />
            </div>
            <div className={style.content1} id='content1'>
                <Draw2 className={style.svg2}/>
            </div>
            <div className={style.content2}>
                <Draw3 className={style.svg3}/>
            </div>
            {/* <div className={style.guide}>
                guide
            </div> */}
            <div className={style.next} onClick={goNext2}>
                <div className={style.slide}></div>
            </div>
            <div className={style.bottom} ref={guideBlock}></div>
        </div>
      </>
    )
}