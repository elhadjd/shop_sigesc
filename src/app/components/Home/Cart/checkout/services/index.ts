"use client"
import React, { useState } from "react"
import {StepsType} from '@/app/types/checkout'
import { useCheckoutContext } from "@/app/contexts/checkout"
import { setCookie } from "cookies-next"
import { Requests } from "@/app/Api"
import { useStateProgressContext } from "@/app/contexts/progress"
import {toast} from 'react-toastify'
import { useClientContext } from "@/app/contexts/clientContext"
export const CheckoutServices = (()=>{
  const {checkout,setCheckout} = useCheckoutContext()
  const {client,setClient,delivery,setDelivery} = useClientContext()
  const {routePost} = Requests()
  const {setState,setColorIcon} = useStateProgressContext()
  const changeStep = ((step: number,event?: React.FormEvent<HTMLFormElement>)=>{
    if (event) event.preventDefault()
    checkout.client = client
    checkout.step = step
    setCheckout({...checkout})
    setCookie('checkout',checkout,{maxAge: 60*60*480})
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
  const handlerChangeInputsDelivery = ((event: {
    target: { id: string; value: string };
  })=>{
    setDelivery(
      {...delivery,[event.target.id]: event.target.value}
    )
    client.delivery = delivery
    setClient({...client})
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

  const insertCheckout = (async(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(checkout.client.delivery.localisation == '') return toast.info('Por favor selecina a sua localisação',{position: 'top-right'})
    setState('submitCheckout')
    await routePost('/checkoutSubmit',checkout)
    .then((response) => {
      if (response.data.message) return toast.success(response.data.message,{position: 'top-right'})
      checkout.client = response.data
      checkout.step = 3
      setCheckout({...checkout})
    }).catch((err) => {
      console.log(err);
    }).finally(()=>{
      setState('')
    });
  })

  const selectLocation = (()=>{
    console.log('Ola');
    
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        checkout.client.delivery.localisation = `${position.coords.latitude},${position.coords.longitude}`
        setCheckout({...checkout})
      },(error)=>{
        console.log(error);
      })
    }else{
      alert('Erro ao obter a localisação')
    }
  })
  return {steps,changeStep,handlerChangeInputsInfo,handlerChangeInputsDelivery,insertCheckout,selectLocation}
})