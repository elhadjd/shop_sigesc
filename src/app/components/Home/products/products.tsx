"use client"
import React, { useEffect } from 'react'
import { ProductsService } from './services/products'
import ListProducts from './listProducts'

export default function Products() {
   const {products} = ProductsService()
  return (
    <div className='flex'>
      <div className='flex w-1/4'>
        <h1>Ola mundo</h1>
      </div>
      <div className='-m-2 flex flex-wrap w-3/4'>
        <ListProducts/>
      </div>
    </div>
  )
}
