"use client"
import React from 'react'
import PurchaseButton from '../public/purchaseButton'
import { formatToKwanza } from '@/lib/currency'
import Link from 'next/link'
import { Product } from '@/app/types/products'

export default function ListProducts({products}:{products:Product[]}) {
    return (
        <>
            {products.map((product, index) => (
                <Link href={`/products/${product.id}`}
                key={product.id}
                className="flex flex-col w-64 max-[500px]:w-32 max-[600px]:w-40 hover:cursor-pointer m-2 hover:border-blue-950 space-y-2 border rounded p-3"
                >
                    <span className="flex h-48 max-[600px]:h-24 max-[500px]:h-16 w-full justify-center items-center">
                        <img className="h-48 w-auto max-[600px]:h-24 max-[500px]:h-16 px-7" src={`https://geral.sisgesc.net/produtos/image/${product.image}`} alt={product.nome} />
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
                </Link>
            ))}
        </>
    )
}
