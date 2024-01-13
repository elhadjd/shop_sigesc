"use client"
import React, { useState } from "react"
import {StepsType} from '@/app/types/checkout'
import { useCheckoutContext } from "@/app/contexts/checkout"
import { Requests } from "@/app/api"
import { useStateProgressContext } from "@/app/contexts/progress"
import {toast} from 'react-toastify'
import { useClientContext } from "@/app/contexts/clientContext"
import { useRouter } from 'next/navigation'


export const CheckoutServices = (()=>{
  const {checkout,setCheckout} = useCheckoutContext()
  const {client,setClient,delivery,setDelivery} = useClientContext()
  const {routePost} = Requests()
  const {setState,setColorIcon} = useStateProgressContext()
  const router = useRouter()
  const changeStep = ((step: number,route:string,event?: React.FormEvent<HTMLFormElement>)=>{
    if (event) event.preventDefault()
    checkout.client = client
    checkout.step = step
    setCheckout({...checkout})
    router.push(`/checkout/${route}`)
  })

  const handlerChangeInputsInfo = ((event: {
    target: { id: string; value: string };
  })=>{
    setClient(
      {...client,[event.target.id]: event.target.value}
    )
    checkout.client = client
    setCheckout({...checkout})
  })

  const [steps,setSteps] = useState<StepsType[]>([
      {
        id: 1,
        name: 'Review'
      },
      {
        id: 2,
        name: 'Identificação'
      },
      {
        id: 3,
        name: 'Entrega'
      },
      {
        id: 4,
        name: 'Pagamento'
      },
  ])

  const insertCheckout = (async()=>{
    setState('submitCheckout')
    setClient({...client})
    checkout.client = client
    setCheckout({...checkout})

    await routePost(`/checkoutSubmit`,checkout)
    .then((response) => {
      if (response.data.message) return toast.success(response.data.message,{position: 'top-right'})
      checkout.client = response.data
      checkout.step = 3
      setCheckout({...checkout})
      router.push('/checkout/payment')
    }).catch((err) => {
      console.log(err);
    }).finally(()=>{
      setState('')
    });
  })

 
  return {steps,changeStep,handlerChangeInputsInfo,insertCheckout}
})