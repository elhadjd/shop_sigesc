import { Requests } from "@/app/Api"
import { useRequestCardContext } from "@/app/contexts/cardContrext"
import { getCookie, setCookie } from 'cookies-next';
import { toast } from 'react-toastify'
import { useStateProgressContext } from '@/app/contexts/progress'
import { ClientTypeScript } from '@/app/types/client'
import { useClientContext } from "@/app/contexts/clientContext";
import { Product } from "@/app/types/products";

export const CartServices = (()=>{
    const {routePost,routeGet,routeDelete} = Requests()
    const {setClient,client} = useClientContext()
    const {setListOrder} = useRequestCardContext()
    const {setState,setColorIcon} = useStateProgressContext()
    
    const addItem = (async(product: Product,quantity: number,checkout?:string)=>{
        const InvoiceId = getCookie('InvoiceId')
        let route: string
        const checkoutString = checkout!=undefined?checkout:''
        if (InvoiceId != undefined) {            
            route = `addProdAtOrder/${quantity}/${InvoiceId}/${checkoutString}`
        }else{
            route = `addProdAtOrder/${quantity}/${checkoutString}`
        }
        setState(`addItem${product.id}`)
        await routePost(route,product)
        .then((response) => {
            if (response.data.message) return toast.error(response.data.message,{position: 'top-right'})
            setListOrder({...response.data})
            saveCookie(response.data.id)
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
            setColorIcon('red-700')
        });
    })

    const getClientActive = (async(client: ClientTypeScript)=>{        
        const InvoiceId = getCookie('InvoiceId')
        await routePost(`/registerUser/${InvoiceId}`,client)
        .then((response) => {
            if(response.data.message) return toast[response.data.type](response.data.message,{position: 'top-right'})
            setClient({...response.data})
            setListOrder(client.invoices[0])            
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
        });
    })

    const getInvoice = (async()=>{
        const InvoiceId = getCookie('InvoiceId')        
        if (InvoiceId != undefined) {
            setState('global')
            await routeGet(`invoice/${InvoiceId}`)
            .then((response) => {
                if (response.data.message) return toast.error(response.data.message,{position: 'top-right'})
                setListOrder({...response.data})
            }).catch((err) => {
                console.log(err);
            }).finally(()=>{
                setState('')
            });
        }
    })

    const saveCookie = ((invoiceId: number)=>{
        setCookie('InvoiceId',invoiceId,{maxAge:60*60*480})
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
    
    return {addItem,removeItem,getInvoice,getClientActive}
})