"use client"
import React, { useState } from "react"
import {StepsType} from '@/app/types/checkout'
import { useCheckoutContext } from "@/app/contexts/checkout"
import { useRequestCardContext } from "@/app/contexts/cardContrext"
import { setCookie } from "cookies-next"
import { Requests } from "@/app/Api"
import { useStateProgressContext } from "@/app/contexts/progress"
import {toast} from 'react-toastify'
export const CheckoutServices = (()=>{
  const {checkout,setCheckout} = useCheckoutContext()
  const {client} = useRequestCardContext()
  const {routePost} = Requests()
  const {setState,setColorIcon} = useStateProgressContext()
  const changeStep = ((step: number,event?: React.FormEvent<HTMLFormElement>)=>{
    if (event) event.preventDefault()
    checkout.client.invoices = client.invoices
    checkout.client.id = client.id
    checkout.step = step
    setCheckout({...checkout})
    setCookie('checkout',checkout,{maxAge: 60*60*480})
  })

  const handlerChangeInputsInfo = ((event: {
    target: { id: string; value: string };
  })=>{
    checkout.client[event.target.id] = event.target.value
  })
  const handlerChangeInputsDelivery = ((event: {
    target: { id: string; value: string };
  })=>{
    checkout.client.delivery[event.target.id] = event.target.value
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

  const insertCheckout = (async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setState('submitCheckout')
    await routePost('/checkoutSubmit',checkout)
    .then((response) => {
      if (response.data.message) return toast[response.data.type](response.data.message,{position: 'TOP-RIGHT'})
      checkout.client = response.data
      checkout.step = 3
      setCheckout({...checkout})
    }).catch((err) => {
      console.log(err);
    }).finally(()=>{
      setState('')
    });
  })
  return {steps,changeStep,handlerChangeInputsInfo,handlerChangeInputsDelivery,insertCheckout}
})