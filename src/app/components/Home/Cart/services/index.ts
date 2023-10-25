"use client"
import { Requests } from "@/app/Api"
import { useRequestCardContext } from "@/app/contexts/cardContrext"
import { Product, TypeInvoice } from "@/app/types"
import { setCookie,getCookie } from 'cookies-next';
import { toast } from 'react-toastify'

import { useStateProgressContext } from '@/app/contexts/progress'
import { ClientTypeScript } from '@/app/types/client'

export const CartServices = (()=>{
    const {routePost,routeGet,routeDelete} = Requests()
    const {client,setClient} = useRequestCardContext()
    const {setState,setColorIcon} = useStateProgressContext()
    
    const addItem = (async(product: Product,quantity: number,checkout?:string)=>{
        const clientStore: ClientTypeScript = JSON.parse(getCookie('client')|| JSON.stringify(client))
        let route: string
        if (clientStore.invoices.id != 0) {
            route = `addProdAtOrder/${quantity}/${clientStore.invoices.id}/${checkout!=undefined?checkout:''}`
        }else{
            route = `addProdAtOrder/${quantity}/${checkout&&checkout}`
        }

        setColorIcon('white')
        setState(`addItem${product.id}`)
        await routePost(route,product)
        .then((response) => {
            if (response.data.message) return toast.error(response.data.message,{position: 'top-right'})
            return saveCookie(response.data)
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
            setColorIcon('red-700')
        });
    })

    const getInvoice = (async()=>{
        const clientStore:ClientTypeScript = JSON.parse(getCookie('client') || JSON.stringify(client))        
        if (clientStore.invoices.id != 0) {
            setState('global')
            await routeGet(`invoice/${clientStore.invoices.id}`)
            .then((response) => {
                if (response.data.message) return toast.error(response.data.message,{position: 'top-right'})
                return saveCookie(response.data)
            }).catch((err) => {
                console.log(err);
            }).finally(()=>{
                setState('')
            });
        }
    })

    const saveCookie = ((invoice: TypeInvoice)=>{
        client.invoices = invoice
        setClient({...client});
        setCookie('client',client,{maxAge:60*60*480})
    })

    const removeItem = (async(id:number)=>{
        setState(`deleteItem${id}`)
        routeDelete(`removeItem/${id}`)
        .then((response) => {
            return saveCookie(response.data)
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
        });
    })
    
    return {addItem,removeItem,getInvoice}
})