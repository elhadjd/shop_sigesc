"use client"
import React, { useState } from "react"
import {StepsType} from '@/app/types/checkout'
import { useCheckoutContext } from "@/app/contexts/checkout"
import { useRequestCardContext } from "@/app/contexts/cardContrext"
import { setCookie } from "cookies-next"
import { Requests } from "@/app/Api"
import { useStateProgressContext } from "@/app/contexts/progress"

export const CheckoutServices = (()=>{
  const {checkout,setCheckout} = useCheckoutContext()
  const {client} = useRequestCardContext()
  const {routePost} = Requests()
  const {setState,setColorIcon} = useStateProgressContext()
  const changeStep = ((step: number,event?: React.FormEvent<HTMLFormElement>)=>{
    if (event) event.preventDefault()
    checkout.client.invoices = client.invoices
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
    checkout.delivery[event.target.id] = event.target.value
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
      console.log(response);
    }).catch((err) => {
      console.log(err);
    }).finally(()=>{
      setState('')
    });
  })
  return {steps,changeStep,handlerChangeInputsInfo,handlerChangeInputsDelivery,insertCheckout}
})