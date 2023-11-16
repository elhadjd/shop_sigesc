"use client"
import { useProductsContext } from '@/app/contexts/productsContext'
import { useHeader } from './services/categoryService'
import React, { useEffect } from 'react'
import {AiOutlineBars} from 'react-icons/ai'
import Link from 'next/link'
import { linksObj } from '@/app/links'

export default function Categories() {
  const {categories} = useProductsContext()
  const {openMenu,stateMenu,getCategories} = useHeader()
  useEffect(()=>{
    (async()=>{
      await getCategories()
    })()
  },[])
  return (
    <div className='h-16 border-b text-blue-950 border-inherit flex max-[950px]:relative'>
      <div onClick={openMenu} className='flex w-96 h-full cursor-pointer hover:text-[#00a5cf] p-3 justify-center items-center max-[950px]:w-64'>
        <AiOutlineBars className="text-2xl"/>
        <span className='ml-3'>Todas as categorias</span>
      </div>
      <div className={`flex font-medium w-full min-[960px]:items-center ${ !stateMenu ? 'max-[960px]:hidden':'max-[960px]:flex  max-[1080px]:z-10 max-[950px]:flex-col max-[950px]:absolute  max-[950px]:top-16 max-[950px]:w-64  max-[950px]:p-2 max-[950px]:border-rg-b max-[950px]:shadow max-[950px]:rounded-br-lg max-[950px]:bg-white'}`}>
        {
          categories.slice(0,8).map((category,index)=>(
            <div key={index} className='relative flex flex-col w-auto p-2 '>
              <Link href={`${linksObj.products.href}/categories/${category.id}`} className='hover:text-[#00a5cf] max-[950px]:text-start max-[950px]:w-full max-[950px]:p-2 hover:cursor-pointer'>{category.name}</Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}
