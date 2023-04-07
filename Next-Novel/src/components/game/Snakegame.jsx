import { useEffect, useState } from "react"
import style from "./Snakegame.module.css"


export default function Snakegame({state}) {
  
  let width = 20
  let currentIndex = 0
  let appleIndex = 0
  let currentSnake = [2, 1, 0]
  let direction = 1
  const [score, setScore] = useState(0)
  let speed = 0.9
  let intervalTime = 0
  let interval = 0
  const [maxscore, setMaxscore] = useState(localStorage.getItem("snakegame_score"))
  const [isplaying, setIsplaying] = useState(false)

  const handleContentLoaded = () => {

    document.addEventListener("keydown", control)
  }

  useEffect(()=> {
    handleContentLoaded()
    const h1 = document.querySelector('#gameover')
    const h2 = document.querySelector('#start')
    glitch(h1)
    glitch(h2)
    h1.classList.add(style.hidden)
    return () => {
      setIsplaying(false)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    settingscore()
  }, [score])

  function settingscore() {
    if(score > maxscore) {
      localStorage.setItem("snakegame_score", score)
      setMaxscore(localStorage.getItem("snakegame_score"))
    }
  }
  //createboard function
  function createBoard() {
    let grid = document.querySelector("#grid")
    for (let i = 0; i < 400; i++) {
      let div = document.createElement("div")
      grid.appendChild(div)
    }
    setScore(0)
  }

  useEffect(() => {
    if(isplaying) {
      const up = document.querySelector('#up')
      const down = document.querySelector('#down')
      const right = document.querySelector('#right')
      const left = document.querySelector('#left')

      up.addEventListener("click", ()=> direction = -width)
      down.addEventListener("click", ()=> direction = +width)
      left.addEventListener("click", ()=> direction = -1)
      right.addEventListener("click", ()=> direction = 1)
    }
  }, [isplaying])


  //startgame function
  function startGame() {
    setIsplaying(true)
    const h1 = document.querySelector('#gameover')
    let h2 = document.querySelector('#start')
    h1.classList.add(style.hidden)
    h2.classList.add(style.hidden)

    let squares = document.querySelectorAll("#grid div")
    randomApple(squares)
    //random apple
    direction = 1
    intervalTime = 75
    currentSnake = [2, 1, 0]
    currentIndex = 0
    currentSnake.forEach((index) => squares[index].classList.add(style.snake))
    interval = setInterval(moveOutcome, intervalTime)
  }

  function moveOutcome() {
    let squares = document.querySelectorAll("#grid div")
    if (checkForHits(squares)) {
      let h1 = document.querySelector('#gameover')
      h1.classList.remove(style.hidden)

      return clearInterval(interval)
    } else {
      moveSnake(squares)
    }
  }

  function moveSnake(squares) {
    let tail = currentSnake.pop()
    squares[tail].classList.remove(style.snake)
    currentSnake.unshift(currentSnake[0] + direction)
    // movement ends here
    eatApple(squares, tail)
    if(squares[currentSnake[0]].classList) {
      squares[currentSnake[0]].classList.add(style.snake)   
    }
  }

  function checkForHits(squares) {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains(style.snake)
    ) {
      return true
    } else {
      return false
    }
  }

  function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains(style.apple)) {
      squares[currentSnake[0]].classList.remove(style.apple)
      squares[currentSnake[0]].classList.add(style.snake)
      squares[tail].classList.add(style.snake)
      currentSnake.push(tail)
      randomApple(squares)
      setScore(score => score + 1)
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcome, intervalTime)
    }
  }

  function randomApple(squares) {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains(style.snake))
    squares[appleIndex].classList.add(style.apple)
  }

  function control(e) {
    
    if ( e.key === 'ArrowUp') {
      direction = -width
    }
    else if (e.key === 'ArrowDown') {
      direction = +width
    }
    else if (e.key === 'ArrowLeft') {
      direction = -1
    }
    else if (e.key === 'ArrowRight') {
      direction = 1
    }
  }

  function replay() {
    let grid = document.querySelector("#grid")
    grid.innerHTML = ""
    document.addEventListener("keydown", control)
    createBoard()
    startGame()
  }

  function glitch(element) {

    let count = 0
    setInterval(() => {
      const skew = Math.random()*20 - 10
      const top1 = Math.random()*100
      const btm1 = Math.random()*100
      const top2 = Math.random()*100
      const btm2 = Math.random()*100

      element.style.setProperty('--skew', `${skew}deg`)
      element.style.setProperty('--t1', `${top1}%`)
      element.style.setProperty('--b1', `${btm1}%`)
      element.style.setProperty('--t2', `${top2}%`)
      element.style.setProperty('--b2', `${btm2}%`)
      element.style.setProperty('--scale', '1')
      

      count++

      if(count % 15 === 0) {
        const bigSkew = Math.random() * 180 -90
        element.style.setProperty('--skew', `${bigSkew}deg`)
      }
      if (count %30 === 0) {
        const bigScale = 1 + Math.random() / 2
        element.style.setProperty('--scale', `${bigScale}`)
      }
    }, 100)
  }

  return (
    <>
      <div className={style.loadingmodal}>
        {state && state !== 'egg' ?
          <div className={style.text}>
            <span>소</span>
            <span>설</span>
            <span>작</span>
            <span>성</span>
            <span>중</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        :
          <></>
        }
        <div className={style.gamepart}>
          <div className={style.grid} id="grid"></div>
          <div className={style.gameover} id='gameover' onClick={replay}>
            <div data-txt="GAME OVER" className={style.gameovertxt}>GAME OVER</div>
          </div>
          <div className={style.start} id='start' onClick={() => {createBoard(); startGame();}}>
            <div data-txt="READY" className={style.starttxt}>READY</div>
          </div>
          <div className={style.rightpart}>
            <div>
              <div className={style.scoreDisplay}>현재 점수 : {score}</div>
              <div className={style.scoreDisplay}>최고 점수 : {maxscore ? maxscore : 0}</div>
              <div style={{'fontSize':'15px', 'marginTop':'10px'}}>
                키보드 혹은 아래 버튼을
                <div>
                  이용해주세요.
                </div>
              </div>
            </div>

            <div className={style.arrow}>
              <img className={style.arrowup} id='up' src={process.env.PUBLIC_URL + 'icon/arrow.svg'}/>
              <div className={style.leftright}>
                <img className={style.arrowleft} id='left' src={process.env.PUBLIC_URL + 'icon/arrow.svg'}/>
                <img className={style.arrowright} id='right' src={process.env.PUBLIC_URL + 'icon/arrow.svg'}/>
              </div>

              <img className={style.arrowdown} id='down' src={process.env.PUBLIC_URL + 'icon/arrow.svg'}/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
