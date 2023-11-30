"use client"
import React, { useEffect } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";
import { CompaniesServices } from './services/companiesServices';
import Link from 'next/link'

export default function Companies() {
    const {breakpointsSlider,getCompanies,companies} = CompaniesServices()
    useEffect(()=>{
        (async()=>{
            await getCompanies()
        })()
    },[])
  return (
    <div className='p-4'>
        <div>
            <span className='uppercase p-2 text-2xl flex justify-center items-center '>Principais impresas</span>
        </div>
        <div className='flex flex-row space-y-2 w-full border h-64 p-4'>
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
                {
                    companies.map((company)=>(
                        <SwiperSlide key={company.id} className='flex flex-col max-w-md h-full bg-white shadow border border-gray-100'>
                            <Link href={`/companies/${company.id}`} className='flex flex-row h-2/3'>
                                <div className='w-2/3 p-2 flex flex-col space-y-2 justify-center items-center '>
                                    <span className='text-2xl font-bold h-1/2 truncate w-full'>{company.name}</span>
                                    <p className='text-ellipsis overflow-hidden h-full p-2 text-light font-sm'>{company.description}</p> 
                                </div>
                                <div className='flex w-1/3 h-full items-center justify-center'>
                                    <img src={`https:geral.sisgesc.net/company/image/${company.image}`} className='w-24 h-24 rounded-full' alt="" />
                                </div>
                            </Link>
                            <div className='h-1/3 flex flex-row space-y-2 justify-around p-2 items-center'>
                                <div className='flex flex-col w-full'>
                                    <span>Telefone</span>
                                    <span>{company.phone}</span>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <span>Localização</span>
                                    <span>{company.city}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </div>
  )
}
