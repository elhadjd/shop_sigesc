"use client"
import React, { ReactNode, createContext, useContext, useState } from "react";
import { Product } from "../types/products";
import { Categories } from "../types/categories";

const GlobalProducts = createContext<
    {
        products: Product[],
        setProducts: React.Dispatch<Product[]>,
        setCategories: React.Dispatch<Categories[]>,
        categories: Categories[]
    }
 | undefined>(undefined)

export const useProductsContext = (()=>{
    const context = useContext(GlobalProducts)
    if (!context) {
        throw new Error('useCheckoutContext deve ser usado dentro de um CheckoutProvider')
    }
    return context
})

interface productsProviderProps {
    children: ReactNode;
}

export const ProductsProvider:React.FC<productsProviderProps> = (({children})=>{
    const [products,setProducts] = useState<Product[]>([])
    const [categories,setCategories] = useState<Categories[]>([])
    return (
        <GlobalProducts.Provider value={{products,setProducts,categories,setCategories}}>
            {children}
        </GlobalProducts.Provider>
    )
})