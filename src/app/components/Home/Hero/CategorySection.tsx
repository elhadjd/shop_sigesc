"use client"
import Image from "next/image";
import { sliderCategory } from "./service/data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
export default function CategorySection() {
  const breakpointsSlider = {
    1700: {
      slidesPerView: 7,
      slidesPerGroup: 7,
    },
    1400: {
      slidesPerView: 6,
      slidesPerGroup: 6,
    },
    1100: {
      slidesPerView: 5,
      slidesPerGroup: 5,
    },
    769: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    500: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    }
  return (
    <div className="container mx-auto">
      <div className="text-center mb-2">
        <h2 className="text-1/2xl md:text-2xl lg:text-3xl">
          NAVEGUE POR CATEGORIA
        </h2>
      </div>
      <Swiper
      slidesPerView={2}
      centeredSlides={false}
      slidesPerGroupSkip={2}
      grabCursor={true}
      keyboard={{
        enabled: true,
      }}
      breakpoints={breakpointsSlider}
      scrollbar={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Keyboard, Navigation]}
      className="mySwiper"
      >
        <div className="flex space-4 w-full justify-center">
          {sliderCategory.map((item, idx) => (
            <SwiperSlide key={idx} className="flex p-2 w-full">
              <div className="flex flex-col items-center justify-center">
                <div className="flex w-32 h-32 rounded-full bg-zinc-500 items-center justify-center">
                  <Image
                    src={item.url || '/sapato02.png'}
                    alt="category"
                    className="h-[50px] flex h-[50px] rounded-full"
                    width={70}
                    height={1080}
                  />
                </div>
                <span className="mt-2 text-center">{item.title}</span> 
              </div>
              
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      
    </div>
  );
}
