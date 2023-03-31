import style from './Block3.module.css';
import { useEffect } from 'react';
import { ReactComponent as Draw1 } from './Draw1.svg';
import { ReactComponent as Draw2 } from './Draw2.svg';
import { ReactComponent as Draw3 } from './Draw3.svg';
// import { ReactComponent as Draw4 } from './Draw4.svg';

export default function Block3(){

    useEffect(() => {
      
        // Get the SVG paths and contents
        const path1 = document.querySelector(`.${style.svg2} path`);
        // const path2 = document.querySelector(`.${style.svg3} path`);
        // const path3 = document.querySelector(`.${style.svg4} path`);

        // Get the SVG paths and contents
        const content1 = document.querySelector(`.${style.content1}`);
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
        <div className={style.block}>
            <div className={style.header}>
                <Draw1 className={style.svg1} />
            </div>
            <div className={style.content1}>
                <Draw2 className={style.svg2}/>
            </div>
            <div className={style.content2}>
                <Draw3 className={style.svg3}/>
            </div>
            <div className={style.content3}>
            </div>
        </div>
    )
}