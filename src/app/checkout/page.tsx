"use client"
import React, { useEffect } from 'react'
import ReviewCart from '../components/Home/Cart/checkout'
import InfoClient from '../components/Home/Cart/checkout/infoClient'
import Delivery from '../components/Home/Cart/checkout/delivery'
import Payment from '../components/Home/Cart/checkout/payment'
import { useCheckoutContext } from '../contexts/checkout'
import { redirect } from 'next/navigation'
import { getCookie, hasCookie } from 'cookies-next'
import { useRequestCardContext } from '../contexts/cardContrext'
import { ClientTypeScript } from '../types/client'

export default function Checkout() {
  const {client} = useRequestCardContext()

  const components = [
    <ReviewCart/>,
    <InfoClient/>,
    <Delivery/>,
    <Payment/>
  ]
  useEffect(()=>{
    if (!hasCookie('client')) {
        return redirect('/auth/login')
    }
    const clientStore:ClientTypeScript = JSON.parse(getCookie('client') || JSON.stringify(client))
    if(clientStore.id == 0) return redirect('/auth/login')
  },[])
  
  const { checkout } = useCheckoutContext()
  return (
    <div>
      {
        components.map((component,index)=>(
          checkout.step === index && component
        ))
      }        
    </div>
  )
}
