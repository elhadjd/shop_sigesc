"use client"
import React, { useEffect, useState } from 'react'
import { Product } from '@/app/types/products';
import { useProductsContext } from '@/app/contexts/productsContext';
import Link from 'next/link';
import { linksObj } from '@/app/links';

export default function Presentation() {
  const [product,setProduct] = useState<Product>()
  const {products} = useProductsContext()
  useEffect(()=>{
      const prod: Product[] = products.filter((product)=>{
        return product.id === 12042
      }) 
      setProduct(prod[0])      
  },[products])
  

  return (
    <Link href={`${linksObj.products.href}/${product?.id}`} className='w-full h-auto px-4 dark'>
          <img className='h-full w-full' src={`https://geral.sisgesc.net/produtos/image/${product?.image}`} alt="" />
    </Link>
  )
}
