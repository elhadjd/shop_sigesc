"use client"
import React, { useEffect, useState } from 'react'
import { categoryService } from './service/categoryService'
import ListProducts from '../../products/listProducts'
import { useProductsContext } from '@/app/contexts/productsContext'
import FilterCategories from '@/app/products/filters/filterCategories'

export default function Category({categoryId}:{categoryId:number}) {
  const {getCategory,category} = categoryService()
  const {products} = useProductsContext()
  useEffect(()=>{
    (async()=>{
      await getCategory(categoryId)
    })()
  },[])

  return (
    <div>
      <div className='h-32 w-full bg-[#00a5cf] p-2 flex items-center'>
        <span className='text-3xl text-white'>{category.name}</span>
      </div>
      <div className='flex flex-row max-[600px]:flex-col'>
        <div className='flex w-1/4 max-[600px]:w-full max-[600px]:relative'>
          <FilterCategories category={category}/>
        </div>
        <div className='flex flex-wrap justify-center w-3/4 max-[600px]:w-full max-[600px]:mt-12'>
          <ListProducts products={category.produtos}/>
        </div>
      </div>
    </div>
  )
}
