"use client"
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import CheckoutSession from '@/app/components/Home/Cart/checkout/payment/session';

const stripePromise = loadStripe("pk_test_51MXf81DdAzxghTUfL7tmN5hHdTT1xbDgTbEOLN14PhegENiuBXpoks8J1H6eS2CMbObSQhzPbk9Q6NnVo13QzlIZ00VSPDd1L3");

export default function Page({params}: {params: {clientSecret: string}}) {
  const [clientSecret,setClientSecret] = useState('')

  useEffect(()=>{
    setClientSecret(params.clientSecret)
  },[])
  return (
    <div id="checkout">
      {clientSecret != '' && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}