"use client"
import React, { useEffect } from 'react'
import ReviewCart from '../components/Home/Cart/checkout'
import InfoClient from '../components/Home/Cart/checkout/infoClient'
import Delivery from '../components/Home/Cart/checkout/delivery'
import Payment from '../components/Home/Cart/checkout/payment'
import { useCheckoutContext } from '../contexts/checkout'
import { CartServices } from '../components/Home/Cart/services'

export default function Checkout() {
  const components = [
    <ReviewCart/>,
    <InfoClient/>,
    <Delivery/>,
    <Payment/>
  ]
  const {getInvoice} = CartServices()
  const { checkout } = useCheckoutContext()
  useEffect(()=>{
    (async()=>{
      await getInvoice()
    })()
  },[])
  return (
    <div>
      {
        components.map((component,index)=>(
          checkout.step === index && (
            <div key={index}>{component}</div>
          )
        ))
      }        
    </div>
  )
}
