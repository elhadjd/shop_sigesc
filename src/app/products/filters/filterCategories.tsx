
import { Categories, SubCategory } from '@/app/types/categories'
import { Product } from '@/app/types/products'
import React from 'react'
interface componentProps{
  productsSubcategory: (products: Product[])=>void,
  category: Categories
}
export const FilterCategories: React.FC<componentProps> = ({category,productsSubcategory}) => {
  return (
    <div className='flex flex-col w-full h-auto p-4'>
      
      <details className="open:bg-white max-[600px]:absolute w-[90%] dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
        <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
          {category.name}
        </summary>
        <div className="mt-3 flex flex-wrap justify-center leading-6">
          {
            category.sub_categories.map((item,index)=>(
              <span key={index} onClick={()=>productsSubcategory(item.produtos)} className='ml-2 max-[600px]:ml-0 text-base font-base border-b w-full p-2 hover:bg-gray-100 cursor-pointer'>{item.name}</span>
            ))
          }
        </div>
      </details>
      
    </div>
  )
}
