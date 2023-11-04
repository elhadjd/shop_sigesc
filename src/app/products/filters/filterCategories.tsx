import { Categories } from '@/app/types/categories'
import React from 'react'
import { HiChevronDown } from 'react-icons/hi'

export default function FilterCategories({category}:{category: Categories}) {
  return (
    <div className='flex flex-col w-full h-auto p-4'>
      <div className='flex flex-row space-x-2 items-center'>
        <span className='text-lg font-bold'>{category.name}</span>
        <HiChevronDown className="text-2xl"/>
      </div>
      {
        category.sub_categories.map((item,index)=>(
          <span className='ml-2 text-base font-base w-full p-2 hover:bg-gray-100 cursor-pointer'>{item.name}</span>
        ))
      }
    </div>
  )
}
