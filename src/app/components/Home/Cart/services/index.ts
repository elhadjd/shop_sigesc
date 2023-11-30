import { Requests } from "@/app/Api"
import { useRequestCardContext } from "@/app/contexts/cardContrext"
import { getCookie, setCookie } from 'cookies-next';
import { toast } from 'react-toastify'
import { useStateProgressContext } from '@/app/contexts/progress'
import { ClientTypeScript } from '@/app/types/client'
import { useClientContext } from "@/app/contexts/clientContext";
import { Product } from "@/app/types/products";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { TypeInvoice } from "@/app/types";

export const CartServices = (()=>{
    const {routePost,routeGet,routeDelete} = Requests()
    const {setClient,client} = useClientContext()
    const {setListOrder,ListOrder} = useRequestCardContext()
    const {setState,setColorIcon} = useStateProgressContext()
    const { isSignedIn } = useUser();
    const router = useRouter()
    
    const addItem = (async(product: Product,quantity: number,checkout?:string)=>{
        if(!isSignedIn) return router.push('/sign-in')
        const checkoutString = checkout!=undefined?checkout:''
        if (client.id == 0 || client.id == null) return toast.info('Precisa efetuar login para adicionar este, se ja fez login por favor atualize o navigador')
        setState(`addItem${product.id}`)
        await routePost(`addProdAtOrder/${quantity}/${client.id}/${checkoutString}`,product)
        .then((response) => {
            if (response.data.message) return toast.error(response.data.message,{position: 'top-right'})
            setClient({...response.data})
            setListItems(response.data.invoices)
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
            setColorIcon('red-700')
        });
    })

    const getClientActive = (async(client: ClientTypeScript)=>{        
        await routePost(`/registerUser`,client)
        .then((response) => {
            if(response.data.message) return toast.dark(response.data.message,{position: 'top-right'})
            setClient({...response.data})
            setListItems(response.data.invoices)
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
        });
    })

    const setListItems = (async(orders: TypeInvoice[])=>{
        ListOrder.TotalInvoice = 0
        ListOrder.RestPayable = 0
        ListOrder.TotalMerchandise = 0
        ListOrder.tax = 0
        ListOrder.invoice_items = []
        orders.forEach(order => {
            ListOrder.TotalInvoice += order.TotalInvoice
            ListOrder.RestPayable += order.RestPayable
            ListOrder.state = order.state
            ListOrder.TotalMerchandise += order.TotalMerchandise
            ListOrder.cliente_id = order.cliente_id
            ListOrder.tax += order.tax
            ListOrder.DateDue = order.DateDue
            ListOrder.DateOrder = order.DateOrder

            order.invoice_items.forEach(item => {
                ListOrder.invoice_items.push(item)
            });
        });

        setListOrder({...ListOrder})

    })

    const removeItem = (async(id:number)=>{
        setState(`deleteItem${id}`)
        routeDelete(`removeItem/${id}`)
        .then((response) => {
            setClient({...response.data})
            setListItems(response.data.invoices)
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            setState('')
        });
    })
    
    return {addItem,removeItem,getClientActive}
})