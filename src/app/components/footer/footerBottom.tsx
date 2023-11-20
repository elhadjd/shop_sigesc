import React from 'react'
import Link from 'next/link'
import { ImFacebook } from 'react-icons/im'
import {FaLinkedinIn, FaYoutube} from 'react-icons/fa'
import { FiInstagram } from 'react-icons/fi'
import { useProductsContext } from '@/app/contexts/productsContext'
import { linksObj } from '@/app/links'
export default function FooterBottom() {
    const {categories} = useProductsContext()
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='flex h-full max-[800px]:flex-col'>
            <div className='flex-auto w-64 h-full'>
                <span className='flex text-lg font-sm uppercase'>Categorias</span>
                <div className='flex space-y-1 flex-col'>
                    {
                        categories.map((category,index)=>(
                            <Link href={`${linksObj.products.href}/categories/${category.id}`} key={index} className='text-sm py-1 font-base'>{category.name}</Link>
                        ))
                    }
                </div>
                
            </div>
            <div className='flex-auto w-64 h-full'>
                <span className='flex text-lg font-sm uppercase'>INSTITUCIONAL</span>
                <div className='flex space-y-1 flex-col'>
                    <Link href={'#'} className='text-sm py-1 font-base'>Quem somos</Link>
                    <Link href={'#'} className='text-sm py-1 font-base'>Nossas lojas</Link> 
                    <Link href={'#'} className='text-sm py-1 font-base'>Segurançã e privacidades somos</Link> 
                    <Link href={'#'} className='text-sm py-1 font-base'>Trabalhe conosco</Link> 
                    <Link href={'https://sisgesc.net'} target='_blank' className='text-sm py-1 font-base'>Nosso site</Link>
                </div>
            </div>
            <div className='flex-auto w-64 h-full'>
                <span className='flex text-lg font-sm uppercase'>AJUDA</span>
                <div className='flex space-y-1 flex-col'>
                    <Link href={'#'} className='text-sm py-1 font-base'>Ajudas frequentes</Link>
                </div>
            </div>
            <div className='flex-auto w-64 h-full space-y-4'>
                <span className='flex text-lg font-sm uppercase'>REDES SOCIAIS</span>
                <div className='flex flex-wrap text-xl items-center justify-center'>
                    <Link className="flex-auto" href={'https://facebook.com/sisgesc'}><ImFacebook/></Link>
                    <Link className="flex-auto items-center justify-center" href={'https://www.linkedin.com/in/leonardo-van-dunen-7a6291283/'}><FaLinkedinIn/></Link>
                    <Link className="flex-auto items-center justify-center" href={'https://www.youtube.com/@sigescTech/playlists'}><FaYoutube/></Link>
                    <Link className="flex-auto items-center justify-center" href={'https://www.instagram.com/leonardo_vandunen/'}><FiInstagram/></Link>
                </div>
            </div>
        </div>
        <div></div>
    </div>
  )
}

