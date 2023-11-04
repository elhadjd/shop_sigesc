"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import { ProductsService } from "./services/products";
import { formatToKwanza } from "@/lib/currency";
import PurchaseButton from "../public/purchaseButton";
import Link from "next/link";
import { useProductsContext } from "@/app/contexts/productsContext";

export default function PreviewProducts() {
  const { getProducts,breakpointsSlider} = ProductsService();
  const {products} = useProductsContext()
  
  useEffect(()=>{
    (async()=>{
      await getProducts(20)
    })()
  },[])
  return (
    <>
      <div className="flex-row space-x-4 mt-10 gap-3 pl-20 pr-20 max-[700px]:pr-16 max-[700px]:pl-16">
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          slidesPerGroupSkip={1}
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
          modules={[Keyboard, Navigation, Pagination, Scrollbar]}
          className="mySwiper"
        >
          {products.map((product, index) => (
            
            <SwiperSlide
                key={index}
                className="h-full flex-col hover:cursor-pointer hover:border-blue-950 space-y-2 border rounded p-3"
              >
              <Link href={`products/${product.id}`}>
                <span className="flex h-80 w-full justify-center items-center">
                  <img className="h-auto" src={`https://geral.sisgesc.net/produtos/image/${product.image}`} alt={product.nome} />
                </span>
                {product.nome && (
                  <div className="absolute top-10 p-2 rounded bg-red-100 text-red-700 right-0 w-40 truncate origin-center rotate-45">
                    {product.nome}
                  </div>
                )}
                <div className="flex flex-col space-y-1">
                  <span className="font-base font-normal truncate justify-center">
                    {product.nome}
                  </span>
                  <span className="w-full text-ellipsis overflow-hidden h-10 text-sm items-center">
                    {product.nome}
                  </span>
                  <span className="items-center text-lg font-bold">
                    {formatToKwanza(product.preçovenda)}
                  </span>
                </div>
                <div>
                  <PurchaseButton {...product}/>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center m-5 items-center">
        <Link href={'/products'} className="text-base p-3 rounded-lg text-white font-bold bg-red-700">
          Ver mais produtos
        </Link>
      </div>
    </>
  );
}
