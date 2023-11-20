import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { SearchProductsServices } from './services/searchProductsServices'

export default function Search() {
const {search} = SearchProductsServices()
  return (
    <span className="relative flex f-2 items-center justify-center">
        <input
            type="search"
            placeholder="O que esta precurando"
            onChange={(e)=>search(e.target.value)}
            className="flex w-full max-[650px]:w-40 max-[500px]:w-32 rounded-md p-2 outline-0 text-base focus:border-dotted focus:border-[#00a5cf] border-2"
          />
          <FiSearch className="absolute text-2xl right-3 text-[#00a5cf]" />
    </span>
  )
}
