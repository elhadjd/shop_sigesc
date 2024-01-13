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
  const {productsView} = useProductsContext()
  
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
          {productsView.length > 0 && productsView.map((product, index) => (
            
            <SwiperSlide
                key={index}
                className="h-full flex-col hover:cursor-pointer hover:border-blue-950 space-y-2 border rounded p-3"
              >
              <div>
                <Link href={`products/${product.id}`} className="flex h-80 z-0 w-full justify-center items-center">
                  <img className="h-auto" src={`https://geral.sisgesc.net/produtos/image/${product.image}`} alt={product.nome} />
                </Link>
                {/* {product.nome && (
                  <div className="absolute top-10 p-2 rounded bg-[#00a5cf] text-white right-0 w-40 truncate origin-center rotate-45">
                    {product.nome}
                  </div>
                )} */}
                <div className="z-20 bg-white">
                  <div className="flex z-50 flex-col bg-white space-y-1">
                    <Link href={`products/${product.id}`} className="font-base font-normal truncate justify-center">
                      {product.nome}
                    </Link>
                    <span className="w-full text-ellipsis overflow-hidden h-10 text-sm items-center">
                      {product.description}
                    </span>
                    <span className="items-center text-lg font-bold">
                      {formatToKwanza(product.preçovenda,product.company.currencyCompany.code)}
                    </span>
                  </div>
                  <div className="">
                    <PurchaseButton {...product}/>
                  </div>
                </div>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex justify-center m-5 items-center">
        <Link href={'/products'} className="text-base p-3 rounded-lg text-white font-bold bg-[#00a5cf]">
          Ver mais produtos
        </Link>
      </div>
    </>
  );
}
