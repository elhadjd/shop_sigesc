"use client"
import React, { useEffect, useRef } from 'react'
import ReviewCart from '../components/Home/Cart/checkout'
import InfoClient from '../components/Home/Cart/checkout/infoClient'
import Delivery from '../components/Home/Cart/checkout/delivery'
import Payment from '../components/Home/Cart/checkout/payment'
import { useCheckoutContext } from '../contexts/checkout'
import { CartServices } from '../components/Home/Cart/services'

export default function Checkout() {
  const components = useRef([
    <ReviewCart key={0}/>,
    <InfoClient key={1}/>,
    <Delivery key={2}/>,
    <Payment key={3}/>
  ])
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
        components.current.map((component,index)=>(
          <div key={index}>
            {checkout.step === index && component}
          </div>
        ))
      }        
    </div>
  )
}
