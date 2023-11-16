"use client"
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useRequestCardContext } from "./cardContrext";
import { ClientTypeScript } from "../types/client";

const GlobalClient = createContext<
    {
        client: ClientTypeScript,
        setClient: React.Dispatch<React.SetStateAction<ClientTypeScript>>
    }
 | undefined>(undefined)

export const useClientContext = (()=>{
    const context = useContext(GlobalClient)
    if (!context) {
        throw new Error('useClientContext deve ser usado dentro de um ClientProvider')
    }
    return context
})

interface clientProviderProps {
    children: ReactNode;
}

export const ClientProvider:React.FC<clientProviderProps> = (({children})=>{
    const {ListOrder} = useRequestCardContext()
    const clientObject = {
        city: '',
        company_id: 0,
        country: '',
        email: '',
        id: 0,
        image: '',
        invoices: [ListOrder],
        name: '',
        token: '',
        phone: '',
        rua: '',
        state: '',
        surname: '',
        whatssap: '',
        user_id_clerk: '',
        delivery: {
          id: 0,
          city: '',
          county: '',
          housNumber: '',
          neighborhood: '',
          road: '',
          comment: ''
        },
    }
    const [client,setClient] = useState<ClientTypeScript>({...clientObject})
    return (
        <GlobalClient.Provider value={{client,setClient}}>
            {children}
        </GlobalClient.Provider>
    )
})