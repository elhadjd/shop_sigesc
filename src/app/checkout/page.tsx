"use client"
import React from 'react'
import ReviewCart from '../components/Home/Cart/checkout'
import InfoClient from '../components/Home/Cart/checkout/infoClient'
import Delivery from '../components/Home/Cart/checkout/delivery'
import Payment from '../components/Home/Cart/checkout/payment'
import { useCheckoutContext } from '../contexts/checkout'

export default function Checkout() {
  const components = [
    <ReviewCart/>,
    <InfoClient/>,
    <Delivery/>,
    <Payment/>
  ]
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
