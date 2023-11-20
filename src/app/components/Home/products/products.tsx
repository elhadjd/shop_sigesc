"use client"
import React, { useEffect, useState } from 'react'
import ListProducts from './listProducts'
import { useProductsContext } from '@/app/contexts/productsContext'
import { ProductsService } from './services/products'
import { IoMdArrowDropright } from "react-icons/io";
import Link from 'next/link'
import { linksObj } from '@/app/links'
import { Product } from '@/app/types/products'

export default function Products() {
  const {setProductsView,categories,setProducts} = useProductsContext()
  const [showSubCat,setShowSubCat] = useState<number>()
  const productsSubcategory = ((products:Product[])=>{
    setProductsView(products || [])
  })
  
  return (
    <div className='flex flex-row max-[650px]:flex-col'>
      <div className='flex w-1/4 max-[650px]:w-full'>
        <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
          <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
            Categorias
          </summary>
          <div className="mt-3 flex flex-wrap justify-center w-full leading-6">
            {categories.map((category,index)=>(
              <div className='flex flex-col relative w-full' key={index}>
                <span className='flex flex-row space-x-2 justify-between items-center text-base font-base border-b p-2 hover:bg-gray-100 cursor-pointer'>
                  <Link href={`${linksObj.products.href}/categories/${category.id}`} className='h-full w-full' >{category.name}</Link>
                  {category.sub_categories.length > 0 && (<IoMdArrowDropright className="flex text-2xl font-bold text-gray-400 border rounded-full hover:bg-[#00a5cf] hover:text-white" onClick={()=>setShowSubCat(showSubCat == index ? undefined : index)}/>)}
                </span>
                {
                  showSubCat == index &&
                  category.sub_categories.length > 0 &&(
                    <div className='min-[650px]:absolute min-[650px]:mt-10 w-full z-20 rounded bg-white border flex flex-col ml-full ml-36 max-[650px]:ml-0'>
                      {
                        category.sub_categories.map((sub,index)=>(
                          <span key={index} onClick={()=>productsSubcategory(sub.produtos)} className='text-base font-base border-b p-2 hover:bg-gray-100 cursor-pointer'>{sub.name}</span>
                        ))
                      }
                    </div>
                  )
                }
              </div>
            ))}
          </div>
        </details>
      </div>
      <div className='flex flex-wrap justify-center w-3/4 max-[650px]:w-full'>
        <ListProducts/>
      </div>
    </div>
  )
}
