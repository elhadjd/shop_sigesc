"use client"
import React, { ReactNode, createContext, useContext, useState } from "react";

const GlobalRedirectAfterLoginContext = createContext<
    {
        route: string,
        setRoute: React.Dispatch<string>
    }
 | ''>('')

export const useRedirectAfterLoginContext = (()=>{
    const context = useContext(GlobalRedirectAfterLoginContext)
    if (!context) {
        throw new Error('useCheckoutContext deve ser usado dentro de um CheckoutProvider')
    }
    return context
})

interface propsProvider {
    children: ReactNode;
}

export const RedirectAfterLoginProvider:React.FC<propsProvider> = (({children})=>{
    const [route,setRoute] = useState<string>('/checkout')
    return (
        <GlobalRedirectAfterLoginContext.Provider value={{route,setRoute}}>
            {children}
        </GlobalRedirectAfterLoginContext.Provider>
    )
})