import { Requests } from "@/app/Api"
import { useCompanyContext } from "@/app/contexts/companyContext"
import { Company } from "@/app/types/company"
import { useState } from "react"

export const companyServices = (()=>{
    const {company,setCompany} = useCompanyContext()
    const [activeComponent,setActiveComponent] = useState<{title: string,step:number}>({
        step: 0,
        title: 'Produtos da empresa'
    })
    const {routeGet} = Requests()
    
    const getCompany = (async(id: number)=>{
        routeGet(`company/${id}`)
        .then((response) => {
            updateCompany(response.data)
        }).catch((err) => {
            console.log(err);
        });
    })

    const updateCompany = ((company:Company)=>{
        setCompany({...company})
    })

    return {getCompany,activeComponent,setActiveComponent,updateCompany}
})