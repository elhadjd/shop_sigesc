import { useHeader } from './services/categoryService'
import React from 'react'
import {AiOutlineBars} from 'react-icons/ai'
export default function Categories() {
  
  const {categories,openMenu,stateMenu} = useHeader()

  return (
    <div className='h-16 border-b text-blue-950 border-inherit flex max-[950px]:relative'>
      <div onClick={openMenu} className='flex w-96 h-full cursor-pointer hover:text-red-700 p-3 justify-center items-center max-[950px]:w-64'>
        <AiOutlineBars className="text-2xl"/>
        <span className='ml-3'>Todas as categorias</span>
      </div>
      <div className={`grid grid-cols-8 text-center gap-1 font-medium w-full items-center ${ !stateMenu ? 'max-[960px]:hidden':'max-[960px]:flex  max-[1080px]:z-10 max-[950px]:flex-col max-[950px]:absolute  max-[950px]:top-16 max-[950px]:w-64  max-[950px]:p-2 max-[950px]:border-rg-b max-[950px]:shadow max-[950px]:rounded-br-lg max-[950px]:bg-white'}`}>
        {
          categories.map((category,index)=>(
            <span key={index} className='hover:text-red-700 max-[950px]:text-start max-[950px]:w-full max-[950px]:p-2 hover:cursor-pointer'>{category.name}</span>
          ))
        }
      </div>
    </div>
  )
}
