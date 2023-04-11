import style from "./NewBookList.module.css"
import NewCard from "../library/NewCard"
import { Component, useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Pagination, Navigation } from "swiper"

import { getrecommend } from "../../api/library.js"

export default function NewBookList() {
  const [reconovels, setReconovels] = useState([])
  const [arr, setArr] = useState()

  useEffect(() => {
    async function getrecolist() {
      try {
        const data = await getrecommend()
        console.log(data)
        setReconovels(data.data)

        let datalen = 5
        if (data.data.length < 5) {
          datalen = data.data.length
        }
        let tmp = []
        for (let i = 0; i < datalen; i++) {
          tmp = [...tmp]
          tmp.push(NewCard)
        }

        setArr(tmp)
      } catch (e) {
        console.log(e)
      }
    }

    getrecolist()
  }, [])

  return (
    <div>
      <div className={style.swiper}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          }}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {arr?.map((Component, index) => (
            <SwiperSlide key={index}>
              <Component props={reconovels[index]} />
            </SwiperSlide>
          ))}
        </Swiper>
        <img
          src={process.env.PUBLIC_URL + "/img/circles_left.svg"}
          className={style.circle_left}
          alt="circle_left"
        />
        <img
          src={process.env.PUBLIC_URL + "/img/circles_right.svg"}
          className={style.circle_right}
          alt="circle_right"
        />
      </div>
    </div>
  )
}
