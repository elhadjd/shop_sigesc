"use client"
import React, { useEffect, useState } from 'react'
import { CategoryService } from './service/categoryService'
import ListProducts from '../../products/listProducts'
import {FilterCategories} from '@/app/products/filters/filterCategories'
import { Product } from '@/app/types/products'
import { useProductsContext } from '@/app/contexts/productsContext'

export default function Category({categoryId}:{categoryId:number}) {
  const {setProductsView} = useProductsContext()
  const {GetCategory,category} = CategoryService()
  useEffect(()=>{
    (async()=>{
      await GetCategory(categoryId)
    })()
  },[])

  const productsSubcategory = ((products:Product[])=>{
    setProductsView(products)
  })

  return (
    <div>
      <div className='h-32 w-full bg-[#00a5cf] p-2 flex items-center'>
        <span onClick={()=>GetCategory(category.id)} className='text-3xl cursor-pointer text-white'>{category.name}</span>
      </div>
      <div className='flex flex-row max-[600px]:flex-col'>
        <div className='flex w-1/4 max-[600px]:w-full max-[600px]:relative'>
          <FilterCategories productsSubcategory={productsSubcategory} category={category}/>
        </div>
        <div className='flex flex-wrap justify-center w-3/4 max-[600px]:w-full max-[600px]:mt-12'>
          <ListProducts />
        </div>
      </div>
    </div>
  )
}
