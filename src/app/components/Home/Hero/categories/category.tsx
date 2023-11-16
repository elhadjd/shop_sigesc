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
      <div className='flex'>
        <div className='flex w-1/4'>
          <FilterCategories category={category}/>
        </div>
        <div className='flex flex-wrap w-3/4'>
          <ListProducts products={category.produtos}/>
        </div>
      </div>
    </div>
  )
}
