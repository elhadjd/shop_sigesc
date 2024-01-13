"use client"
import React, { useEffect, useRef } from 'react'
import ReviewCart from '../../components/Home/Cart/checkout'
import InfoClient from '../../components/Home/Cart/checkout/infoClient'
import Delivery from '../../components/Home/Cart/checkout/delivery'
import Payment from '../../components/Home/Cart/checkout/payment'
import { useCheckoutContext } from '../../contexts/checkout'
import { useClientContext } from '../../contexts/clientContext'
import ListProducts from '../../components/Home/products/listProducts'

export default function Checkout({params}:{params: {step:string}}) {
  const components = useRef([
    <ReviewCart key={"review"}/>,
    <InfoClient key={"personal_info"}/>,
    <Delivery key={"address"}/>,
    <Payment key={"payment"}/>
  ])
  const { checkout,setCheckout } = useCheckoutContext()
  const {client} = useClientContext()
  useEffect(()=>{
    checkout.client = client
    setCheckout({...checkout})
  },[])
  return (
    <div>
      {
        components.current.map((component,index)=>(
          <div key={index}>
            {params.step === component.key && component}
          </div>
        ))
      }
      <div className='flex justify-center '>
        More products for you
      </div>
      <div className="flex flex-wrap justify-center w-full max-[650px]:w-full">
        <ListProducts />
      </div> 
    </div>
  )
}
