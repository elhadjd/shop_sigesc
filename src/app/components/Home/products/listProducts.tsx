"use client"
import React, { useEffect } from 'react'
import PurchaseButton from '../public/purchaseButton'
import { formatToKwanza } from '@/lib/currency'
import Link from 'next/link'
import { Product } from '@/app/types/products'
import { ProductsService } from './services/products'
import { useProductsContext } from '@/app/contexts/productsContext'

export default function ListProducts() {
    const {productsView} = useProductsContext()
    const {getProducts} = ProductsService()
    useEffect(()=>{
        getProducts(100)
    },[])
    return (
        <>
            {productsView.length > 0 && productsView.map((product, index) => (
                <div
                key={product.id}
                className="flex flex-col w-64 max-[500px]:w-36 max-[600px]:w-40 max-[600px]:m-1 hover:cursor-pointer m-2 hover:border-blue-950 space-y-2 border rounded max-[600px]:p-1 p-3"
                >
                    <Link href={`/products/${product.id}`} className="flex h-48 max-[600px]:h-24 max-[500px]:h-16 w-full justify-center items-center">
                        <img className="h-48 w-auto max-[600px]:h-24 max-[500px]:h-16 px-7" src={`https://geral.sisgesc.net/produtos/image/${product.image}`} alt={product.nome} />
                    </Link>
                    <div className="flex flex-col space-y-1">
                        <Link href={`/products/${product.id}`} className="font-base font-normal truncate justify-center">
                            {product.nome}
                        </Link>
                        <span className="w-full text-ellipsis overflow-hidden h-10 text-sm items-center">
                            {product.description}
                        </span>
                        <span className="flex max-[500px]:justify-center items-center text-lg max-[600px]:text-base font-bold">
                            {formatToKwanza(product.preçovenda,product.company.currencyCompany.code)}
                        </span>
                    </div>
                    <div>
                        <PurchaseButton {...product}/>
                    </div>
                </div>
            ))}
        </>
    )
}
