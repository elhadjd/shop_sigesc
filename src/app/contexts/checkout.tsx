"use client"
import React, { ReactNode, createContext, useContext, useState } from "react";
import { Checkout } from "../types/checkout";
import { useRequestCardContext } from "./cardContrext";

const globalCheckout = createContext<
    {checkout: Checkout,setCheckout: React.Dispatch<Checkout>}
 | undefined>(undefined)

export const useCheckoutContext = (()=>{
    const context = useContext(globalCheckout)
    if (!context) {
        throw new Error('useCheckoutContext deve ser usado dentro de um CheckoutProvider')
    }
    return context
})

interface checkoutProviderProps {
    children: ReactNode;
}

export const CheckoutProvider:React.FC<checkoutProviderProps> = (({children})=>{
    const {client} = useRequestCardContext()
    const [checkout,setCheckout] = useState<Checkout>({
        step: 0,
        client: client
      })
    return (
        <globalCheckout.Provider value={{checkout,setCheckout}}>
            {children}
        </globalCheckout.Provider>
    )
})