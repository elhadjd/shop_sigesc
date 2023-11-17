import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { ProductsService } from './services/products'

export default function Search() {
    const {search} = ProductsService()
  return (
    <>
        <input
            type="search"
            placeholder="O que esta precurando"
            onChange={(e)=>search(e.target.value)}
            className="w-full rounded-md p-2 outline-0 text-base focus:border-dotted border-2"
          />
          <FiSearch className="absolute text-2xl right-3 text-blue-950" />
    </>
  )
}
