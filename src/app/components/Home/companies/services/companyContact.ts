import { Requests } from "@/app/api"
import { useClientContext } from "@/app/contexts/clientContext"
import { useCompanyContext } from "@/app/contexts/companyContext"
import React, { useState } from "react"
import { useStateProgressContext } from '@/app/contexts/progress'
import {toast} from 'react-toastify'
interface Inputs{type:string,id:string,placeholder:string}
export const CompanyContactService = (()=>{
    const {setState} = useStateProgressContext()
    const {routePost} = Requests()
    const {client} = useClientContext()
    const {company} = useCompanyContext()
    const [form,setForm] = useState<{
        client_id: number,
        company_id:number,
        name: string,
        email:string,
        tel: string,
        message: string
    }>({
        client_id: 0,
        company_id: 0,
        name: '',
        email: '',
        message: '',
        tel: ''
    })
    const inputs:Inputs[] = [
        {
            type: 'text',
            id:'name',
            placeholder: 'Seu nome',
        },
        {
            type: 'email',
            id:'email',
            placeholder: 'Seu email',
        },
        {
            type: 'tel',
            id:'tel',
            placeholder: 'Seu numero de telefone',
        },
    ]
    function handlerChangeInput(e:any) {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        })
    }
    const handlerSendMessage = (async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        form.client_id = client.id
        form.company_id = company.id
        setForm({...form})
        setState('smsCompany')
        await routePost('sendMessageCompany',form)
        .then((response) => {
            form.email = '',
            form.name = '',
            form.tel = ''
            form.message = ''
            setForm({...form})
            toast.dark(response.data,{position:"top-right"})
        }).catch((err) => {
            toast.error(err.response.data,{position:"top-right"})
            console.log(err);
        }).finally(()=>{ 
            setState('')
        });
    })
    return {handlerSendMessage,inputs,form,setForm,handlerChangeInput}
})