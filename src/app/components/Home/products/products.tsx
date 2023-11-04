"use client"
import React, { useEffect } from 'react'
import ListProducts from './listProducts'
import { useProductsContext } from '@/app/contexts/productsContext'
import { ProductsService } from './services/products'

export default function Products() {
  const {products} = useProductsContext()
  const {getProducts} = ProductsService()
  useEffect(()=>{
      getProducts(100)
  },[])
  return (
    <div className='flex'>
      <div className='flex w-1/4'>
        <h1>Ola mundo</h1>
      </div>
      <div className='flex flex-wrap w-3/4'>
        <ListProducts products={products}/>
      </div>
    </div>
  )
}
