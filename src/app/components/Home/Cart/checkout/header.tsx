"use client"
import { linksObj } from '@/app/links'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { PiLockThin } from 'react-icons/pi'
import { toast } from 'react-toastify'
import { CheckoutServices } from './services'
import { useRequestCardContext } from '@/app/contexts/cardContrext'
import { useCheckoutContext } from '@/app/contexts/checkout'
import { CartServices } from '../services'
import { getCookie, setCookie } from 'cookies-next'
import { Checkout } from '@/app/types/checkout'
import { ClientTypeScript } from '@/app/types/client'

export default function HeaderCheckout() {
  const {steps} = CheckoutServices()
  const { setCheckout, checkout} = useCheckoutContext()
  const {client} = useRequestCardContext()
  const {getInvoice} = CartServices()

  
  useEffect(()=>{
    (async()=>{
      await getInvoice()
      const checkoutStore:Checkout = JSON.parse(getCookie('checkout') || JSON.stringify(checkout))      
      if(client.invoices.invoice_items.length<=0){
        toast.info('Não tem produtos no carrinho ',{
          position: "top-right",
          onOpen: (()=>{
            return redirect('/products')
          })
        })
      }
      
      if (checkoutStore.client.invoices.id != 0) {
        const clientStore: ClientTypeScript = JSON.parse(getCookie('client') || JSON.stringify(client))
        checkout.client = clientStore
        console.log(clientStore);
        
        setCheckout({...checkoutStore})        
        return setCookie('checkout',checkout)
      }
    })()
  },[])

  return (
    <div className='w-full fixed bg-white z-20 flex flex-col ease-in-out duration-300'>
      <div className='h-32 border-b w-full border-inherit flex'>
        <div className='flex w-1/4 p-4 h-full flex items-center'>
          <Link className='flex-auto justify-center' href={linksObj.home.href}>
            <h2 className='flex justify-center font-bold text-3xl text-red-700'>SIGESC</h2>
          </Link>
        </div>
        <div className='-m-2 flex justify-between text-2xl p-4 w-3/4 h-full flex items-center'>
          {
            steps.map((item)=>(
              <div key={item.id}>
                <span>{item.id}. </span>
                <span>{item.name}</span>
              </div>
            ))
          }
        </div>
        <div className='w-1/4 flex space-x-2 justify-center items-center'>
          <PiLockThin className="text-3xl text-red-700"/>
          <p>Ambiente seguro</p>
        </div>
      </div>
    </div>
  )
}
