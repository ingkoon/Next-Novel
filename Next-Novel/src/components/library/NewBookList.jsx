import style from './NewBookList.module.css'
import NewCard from "../library/NewCard";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function NewBookList() {
  return (
    <div>
      <div className={style.swiper}>

        <Swiper
          style={{
            '--swiper-navigation-color': '#000',
            '--swiper-pagination-color': '#000',
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
          <SwiperSlide><NewCard/></SwiperSlide>
          <SwiperSlide><NewCard/></SwiperSlide>
          <SwiperSlide><NewCard/></SwiperSlide>
          <SwiperSlide><NewCard/></SwiperSlide>
          <SwiperSlide><NewCard/></SwiperSlide>
        </Swiper>
        <img src={process.env.PUBLIC_URL+'/img/circles_left.svg'} className={style.circle_left} alt='circle_left'></img>
        <img src={process.env.PUBLIC_URL+'/img/circles_right.svg'} className={style.circle_right} alt='circle_right'></img>
      </div>


      {/* <div className={style.newbooklist}>
        <div className={style.newbook_before}>
          &lt;
        </div>
        <NewCard/>
        <div className={style.newbook_next}>
          &gt;
        </div>
      </div> */}
    </div>
  )
}