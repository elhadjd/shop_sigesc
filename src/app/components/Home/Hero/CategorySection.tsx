"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import { useProductsContext } from "@/app/contexts/productsContext";
import Link from "next/link";
import { linksObj } from "@/app/links";
export default function CategorySection() {
  const {categories} = useProductsContext()
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
    <div className="container mx-auto mb-2">
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
          {categories.map((item, idx) => (
            <SwiperSlide key={idx} className="flex p-2 w-full">
              <Link href={`${linksObj.products.href}/categories/${item.id}`} className="flex flex-col items-center justify-center">
                <div className="flex w-32 p-4 h-32 rounded-full bg-zinc-500 items-center justify-center">
                  <img src={`/categories/image/${item.image}`} alt="" className="h-full w-full rounded-full" />
                </div>
                <span className="mt-2 text-center">{item.name}</span> 
              </Link>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      
    </div>
  );
}
