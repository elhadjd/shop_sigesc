"use client"
import React, { useEffect } from 'react'
import { _productService } from './service'
import PurchaseButton from '../../public/purchaseButton'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { formatToKwanza } from '@/lib/currency'
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import ListProducts from '../listProducts';
export default function _Product({productId}: {productId: number}) {
  const {getProduct,changeImage,image,product} = _productService()
  useEffect(()=>{
    (async()=>{
      await getProduct(productId)
    })()
  },[])
  return (
    <div className='w-full h-auto flex flex-col h-auto bg-white'>
      <div className='flex max-[800px]:flex-col h-auto w-full bg-white p-4'>
        <div className='flex w-3/5 max-[800px]:w-full max-[1000px]:w-full flex-row h-full bg-gray-100 '>
          <span className='w-[100px] flex flex-col overflow-auto max-h-[550px] space-y-2 p-1 bg-white'>
            {
              product.product_pictures.map((item,index)=>(
                <img key={index} className='h-auto w-auto' onClick={()=>changeImage(item.image)} src={`http://sisgesc.com/produtos/image/${item.product_id}/${item.image}`} alt="" />
              ))
            }
          </span>
          <span className="flex max-h-[550px] w-[80%]">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: false,
            }}
            navigation={true}
            modules={[Pagination,Navigation]}
            >
              {
                product.product_pictures.map((item,index)=>(
                <SwiperSlide key={index} className='flex flex-row w-full items-center justify-center'>
                  <img className="h-full max-h-[550px] w-auto" src={`http://sisgesc.com/produtos/image/${item.product_id}/${item.image}`} alt={product.nome}/>
                </SwiperSlide>
                ))
              }
            </Swiper>
          </span>
        </div>
        <div className='w-2/5 flex p-4 flex-col max-[800px]:w-full justify-around'>
          <span className='flex w-full p-4 items-center justify-end'>
            <AiFillLike className="text-3xl text-[#00a5cf]"/>
            <AiOutlineLike className="text-3xl text-[#00a5cf]"/>
          </span>
          <div className='flex flex-col space-y-6'>
            <span className='text-2xl font-semibold'>{product.nome}</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti et sunt quas, molestias optio dolorem. Odit veritatis molestiae dolorum cumque sit voluptatibus? Impedit reiciendis possimus quo necessitatibus ratione esse quod?</p>
            <div className='flex space-x-4'>
              <strong>Preço:</strong>
              <h3>{formatToKwanza(product.preçovenda,product.company.currencyCompany?.code)}</h3>
            </div>
          </div>
          <div>
            <PurchaseButton {...product} />
          </div>
        </div>
      </div>

      <div className='w-full p-4 max-[500px]:p-0 h-auto'>
        <h2 className='text-center p-4 h1'>PRODUTOS COMO A MESMAS CATEGORIAS</h2>
        <hr className='w-full border-2 bg-black-400'/>
        <div className='w-auto flex flex-wrap justify-center'>
          <ListProducts/>
        </div>
      </div>
    </div>
  )
}
