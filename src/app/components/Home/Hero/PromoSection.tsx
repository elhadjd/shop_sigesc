"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
import { sliderPromo } from "./service/data";

export default function PromoSection() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        navigation={false}
        modules={[Autoplay]}
        className="max-[650px]:h-[300px] w-full"
      >
        {sliderPromo.map((item, idx) => (
          <SwiperSlide key={idx} className="w-full h-full max-[650px]:h-[200px]">
            <Link href="/promo">
              <img src={`/${item.url}`} className="w-full h-full object-cover" alt=""/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}