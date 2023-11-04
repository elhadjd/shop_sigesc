import React, { useEffect } from 'react'
import { CartServices } from '../../services'
import { useRequestCardContext } from '@/app/contexts/cardContrext'
import PayPal from './paypal'
import Visa from './visa'

export default function Payment() {
  const {getClientActive} = CartServices()
  const {client} = useRequestCardContext()
  useEffect(()=>{
    (async()=>{
      await getClientActive(client)
    })
  })
  return (
    <>
      <div className='w-full h-40 flex items-center flex-col dark'>
        <span className='w-full text-red-700 h-20 flex items-center justify-center text-2xl font-base text-center'>
          <h2>Pagamento</h2>
        </span>
        <div className='flex w-full h-20 justify-around '>
          <span className='flex items-center flex-row space-x-4 text-lg'>
            <strong>Cliente:</strong>
            <span>{client.name}</span>
          </span>
          <span className='flex items-center flex-row space-x-4 text-lg'>
            <strong>Total</strong>
            <span>{client.invoices[0].TotalInvoice}</span>
          </span>
        </div>
      </div>
      <div className='w-full  h-auto flex justify-center'>
        <div className='w-1/2'>
          <PayPal/>
          <Visa/>
        </div>
      </div>
    </>
    
  )
}
