"use client"
import React, { useEffect } from 'react'
import PurchaseButton from '../public/purchaseButton'
import { ProductsService } from './services/products'
import { formatToKwanza } from '@/lib/currency'

export default function ListProducts() {
    const {getProducts,products} = ProductsService()
    useEffect(()=>{
            getProducts(100)
    },[])
    return (
        <div>
            {products.map((product, index) => (
                <div
                key={index}
                className="flex-col w-80 hover:cursor-pointer m-2 hover:border-blue-950 space-y-2 border rounded p-3"
                >
                    <span className="flex h-80 w-full justify-center items-center">
                        <img className="h-80 w-full px-7" src={`https://geral.sisgesc.net/produtos/image/${product.image}`} alt={product.nome} />
                    </span>
                    <div className="flex flex-col space-y-1">
                        <span className="font-base font-normal truncate justify-center">
                            {product.nome}
                        </span>
                        <span className="w-full text-ellipsis overflow-hidden h-10 text-sm items-center">
                            {product.nome}
                        </span>
                        <span className="items-center text-lg font-bold">
                            {formatToKwanza(product.preçovenda)}
                        </span>
                    </div>
                    <div>
                        <PurchaseButton {...product}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
