import { Requests } from "@/app/Api"
import { useCompanyContext } from "@/app/contexts/companyContext"
import { useProductsContext } from "@/app/contexts/productsContext"
import { Company } from "@/app/types/company"
import { useState } from "react"
import { toast } from "react-toastify"

export const CompanyServices = (()=>{
    const {company,setCompany} = useCompanyContext()
    const {setProducts,setProductsView,products} = useProductsContext()
    const [activeComponent,setActiveComponent] = useState<{title: string,step:number}>({
        step: 0,
        title: 'Produtos da empresa'
    })
    const {routeGet} = Requests()
    
    const getCompany = (async(id: number)=>{
        routeGet(`company/${id}`)
        .then((response) => {
            if(response.data.message) return toast.info(response.data.message,{position:'top-right'})
            updateCompany(response.data)
        }).catch((err) => {
            console.log(err);
        });
    })

    const updateCompany = ((company:Company)=>{
        setProductsView(company.produtos)
        setProducts(company.produtos)
        setCompany({...company})
    })

    return {getCompany,activeComponent,setActiveComponent,updateCompany}
})