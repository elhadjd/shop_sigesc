"use client"
import { useState } from "react"
import {StepsType} from '@/app/types/checkout'
import { useCheckoutContext } from "@/app/contexts/checkout"
import { useRequestCardContext } from "@/app/contexts/cardContrext"

export const CheckoutServices = (()=>{
  const {checkout,setCheckout} = useCheckoutContext()
  const {ListOrder} = useRequestCardContext()
  const changeStep = ((step: number)=>{
    checkout.invoice = ListOrder
    checkout.step = step
    setCheckout({...checkout})
    console.log(checkout);
    
    localStorage.setItem('checkout',JSON.stringify(checkout))
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
  return {steps,changeStep}
})