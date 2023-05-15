import style from "./NewBookList.module.css";
import NewCard from "./NewCard";
import { Component, useEffect, useState, CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import { getrecommend } from "../../api/library";

interface SwiperStyle extends CSSProperties {
  "--swiper-navigation-color"?: string;
  "--swiper-pagination-color"?: string;
}


export default function NewBookList() {
  const [reconovels, setReconovels] = useState([]);
  const [arr, setArr] = useState();

  const swiperStyle: SwiperStyle = {
  "--swiper-navigation-color": "#000",
  "--swiper-pagination-color": "#000",
};

  useEffect(() => {
    async function getrecolist() {
      try {
        const data = await getrecommend();
        console.log(data);
        setReconovels(data.data);

        let datalen = 5;
        if (data.data.length < 5) {
          datalen = data.data.length;
        }
        console.log("길이" + datalen);
      } catch (e) {
        console.log(e);
      }
    }

    getrecolist();
  }, []);

  return (
    <div>
      <div className={style.swiper}>
        <Swiper
          style={swiperStyle}
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
          {reconovels?.map((newcard, index) => (
            <SwiperSlide key={index}>
              <NewCard props={newcard} />
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
  );
}
