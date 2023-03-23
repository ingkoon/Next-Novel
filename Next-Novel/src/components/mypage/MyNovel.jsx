import React, { useRef } from 'react';
import style from "./mynovel.module.css"
import style2 from "../library/Booklist.module.css"
import BookList from "./BookList"
import Gototop from "../common/GoToTop"

export default function MyNovel() {
  // const showContent = (e) => {
  //   const book = document.querySelector("#booklist1")
  //   const icon = document.querySelector('#tri1')
  //   if (book.className === 'remove') {
  //     book.className = 'appear'
  //     icon.style.transform = 'rotate(0deg)'
  //   } else {
  //     // setTimeout(funtion() { book.className = 'disappear'}, 1001);
  //     icon.style.transform = 'rotate(180deg)'
  //   }
  // }
  // const showContent2 = (e) => {
  //   const book2 = document.querySelector("#booklist2")
  //   const icon2 = document.querySelector('#tri2')
  //   if (book2.style.display === "none") {
  //     book2.style.display = ""
  //     icon2.style.transform = 'rotate(0deg)'
  //   } else {
  //     book2.style.display = "none"
  //     icon2.style.transform = 'rotate(180deg)'
  //   }
  // }


  const parentRef = useRef(null);
  const childRef = useRef(null);
  const parentRef2 = useRef(null);
  const childRef2 = useRef(null);

  const [isCollapse, setIsCollapse] = React.useState(false)

  const handleButtonClick = React.useCallback( e => {
    const icon = document.querySelector('#tri1')
    e.stopPropagation()
    if(parentRef.current === null || childRef.current === null) {
      return
    }
    if(parentRef.current.clientHeight > 0) {
      icon.style.transform = 'rotate(0deg)'
      parentRef.current.style.height = "0"
    } else {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`
      icon.style.transform = 'rotate(180deg)'
    }
    setIsCollapse(!isCollapse)
  }, [isCollapse])

  const handleButtonClick2 = React.useCallback( e => {
    const icon = document.querySelector('#tri2')
    e.stopPropagation()
    if(parentRef2.current === null || childRef2.current === null) {
      return
    }
    if(parentRef2.current.clientHeight > 0) {
      icon.style.transform = 'rotate(0deg)'
      parentRef2.current.style.height = "0"
    } else {
      parentRef2.current.style.height = `${childRef2.current.clientHeight}px`
      icon.style.transform = 'rotate(180deg)'
    }
    setIsCollapse(!isCollapse)
  }, [isCollapse])
  
  return (
    <div>
      <hr className={style2.line} />

      <div className={style.titlebar}>
        <div className={style.mynoveltitle}>
          <span className={style.step}>1</span>
          <img
            src={process.env.PUBLIC_URL + "/icon/logo.svg"}
            className={style.logo}
            alt="logo"
          />
        </div>

        <div className={style.title}>제작한 소설</div>

        <button>2</button>
        <div className={style.triangle}>
          <img
            src={process.env.PUBLIC_URL + "/icon/triangle.svg"}
            alt=''
            onClick={handleButtonClick}
            id = 'tri1'
          />
        </div>
      </div>

      <div ref={parentRef} className={style.booklist} id="booklist1">
        <div ref={childRef} style={{'width':'90%'}}>
          <BookList />
        </div>
      </div>

      <hr className={style2.line} />

      <div className={style.titlebar}>
        <div className={style.mynoveltitle}>
          <span className={style.step}>2</span>
          <img
            src={process.env.PUBLIC_URL + "/icon/logo.svg"}
            className={style.logo}
            alt="logo"
          />
        </div>

        <div className={style.title}>좋아요 누른 소설</div>

        <button>2</button>
        <div className={style.triangle} >
          <img src={process.env.PUBLIC_URL + "/icon/triangle.svg"} alt='' onClick={handleButtonClick2} id='tri2' />
        </div>
      </div>

      <div ref={parentRef2} className={style.booklist} id="booklist2">
        <div ref={childRef2} style={{'width':'90%'}}>
          <BookList />
        </div>
      </div>

      <Gototop />
    </div>
  )
}
