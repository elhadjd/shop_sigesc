"use client"
import react,{useEffect} from 'react'
import { Requests } from "@/app/Api"
import { useRequestCardContext } from "@/app/contexts/cardContrext"
import { Product } from "@/app/types"
import { toast } from 'react-toastify'
import { useStateProgressContext } from '@/app/contexts/progress'

export const CartServices = (()=>{
    const {routePost,routeGet,routeDelete} = Requests()
    const {ListOrder,setListOrder} = useRequestCardContext()
    const {setState,setColorIcon} = useStateProgressContext()
    const addItem = (async(product: Product,quantity: number)=>{
        const invoiceStore = JSON.parse(localStorage.getItem('invoice'))
        let route: string
        if (invoiceStore) {
            route = `addProdAtOrder/${quantity}/${invoiceStore.id}`
        }else{
            route = `addProdAtOrder/${quantity}`
        }
        setColorIcon('white')
        setState(`addItem${product.id}`)
        await routePost(route,product)
        .then((response) => {
            if (response.data.message) return toast.error(response.data.message,{position: 'top-right'})
            localStorage.setItem('invoice',JSON.stringify(response.data))
            setListOrder({...response.data});
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
            setColorIcon('red-700')
        });
    })

    const getInvoice = (async()=>{
        const invoiceStore = JSON.parse(localStorage.getItem('invoice'))
        if (invoiceStore !=null) {
            setState('global')
            await routeGet(`invoice/${invoiceStore.id}`)
            .then((response) => {
                if (response.data.message) return toast.error(response.data.message,{position: 'top-right'})
                localStorage.setItem('invoice',JSON.stringify(response.data))
                setListOrder({...response.data})                                
            }).catch((err) => {
                console.log(err);
            }).finally(()=>{
                setState('')
            });
        }
    })

    const removeItem = (async(id:number)=>{
        setState(`deleteItem${id}`)
        routeDelete(`removeItem/${id}`)
        .then((response) => {
            setListOrder({...response.data})
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
        });
    })
    
    return {addItem,removeItem,getInvoice}
})