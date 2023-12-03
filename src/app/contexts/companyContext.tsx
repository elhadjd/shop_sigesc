"use client"
import React, { ReactNode, createContext, useContext, useState } from "react";
import { Company } from "../types/company";

const GlobalCompany = createContext<
    {
        company: Company,
        setCompany: React.Dispatch<React.SetStateAction<Company>>
    }
 | undefined>(undefined)

export const useCompanyContext = (()=>{
    const context = useContext(GlobalCompany)
    if (!context) {
        throw new Error('useClientContext deve ser usado dentro de um ClientProvider')
    }
    return context
})

interface companyProviderProps {
    children: ReactNode;
}

export const CompanyProvider:React.FC<companyProviderProps> = (({children})=>{
    const [company,setCompany] = useState<Company>({
        activity_type: {
            name: ''
        },
        activity_type_id: 0,
        city: '',
        country: '',
        description: '',
        email: '',
        house_number: '',
        id: 0,
        image: '',
        manager: 0,
        name:'',
        nif:'',
        phone:'',
        produtos:[],
        companyRattings: [],
        sede:'',
        currencyCompany: {
            code: 'USD',
            company_id:0,
            currency: 'USD dollar',
            digits:2,
            id: 0,
            number: 840
        }
    })
    return (
        <GlobalCompany.Provider value={{company,setCompany}}>
            {children}
        </GlobalCompany.Provider>
    )
})