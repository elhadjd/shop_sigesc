import { Requests } from "@/app/Api";
import { useClientContext } from "@/app/contexts/clientContext";
import { companyRatting } from "@/app/types/company";
import * as React from "react";
import { CompanyServices } from "./companyService";
import { toast } from "react-toastify";

export const RattingServices = (()=>{
    const {routeGet,routePost} = Requests()
    const {client,setClient} = useClientContext()
    const {updateCompany} = CompanyServices()
    const [form, setForm] = React.useState<companyRatting>({
        comment: '',
        ratting: 0,
        client_id: client.id,
        company_id: 0,
        createdAt: '',
        updatedAt: '',
        cliente:client
    });
    const data: {ratting: number,comment: string,date: string}[]= [
        {
            ratting: 2,
            comment: 'Empresa muito orivel',
            date: '02/04/2023'
        },
        {
            ratting: 4,
            comment: 'Empresa muito orivel',
            date: '02/04/2023'
        },
        {
            ratting: 1,
            comment: 'Empresa muito orivel',
            date: '02/04/2023'
        },
        {
            ratting: 5,
            comment: 'Empresa muito orivel',
            date: '02/04/2023'
        },
        {
            ratting: 2,
            comment: 'Empresa muito orivel',
            date: '02/04/2023'
        },
    ]

    const changeForm = ((type: string,value: any)=>{
        setForm({
            ...form,
            [type]: value
        })
    })

    const handlerSubmitRatting = (async(event:React.FormEvent<HTMLFormElement>,company_id: number)=>{
        event.preventDefault()
        form.company_id = company_id
        if(form.comment == '') return toast.warn('Comentario obligatorio',{position: 'top-right'})
        setForm({...form})
        routePost('registerRatting',form)
        .then((response) => {
            updateCompany(response.data)
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            form.comment = '',
            form.ratting = 0,
            setForm({...form})
        });
        
    })
    

    return {handlerSubmitRatting,data,changeForm,form,setForm}
})