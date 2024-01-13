import { Requests } from "@/app/api"
import { useState } from "react"
import { toast } from "react-toastify"

export const PaymentSuccessFullServices = (()=>{
    const [invoice , setInvoice] = useState<any>()
    const sessionId = localStorage.getItem('checkoutSession')
    const {routePost} = Requests()
    const registerPayment = (async(order: number)=>{
        routePost(`RegisterPayment/${order}`,{sessionId: sessionId})
        .then((response) => {
            if(response.data.message)  toast.dark(response.data.message,{position: 'top-right'})
            setInvoice(response.data)
        }).catch((err) => {
            if(err.response.data.message) toast.error(err.response.data.message,{position: 'top-right'})
            console.log(err);
        });
    })

    return {registerPayment,invoice}
})