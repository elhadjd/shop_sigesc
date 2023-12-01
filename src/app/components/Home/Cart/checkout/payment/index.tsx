import React, { useEffect } from 'react'
import { CartServices } from '../../services'
import PayPal from './paypal'
import Visa from './visa'
import { useClientContext } from '@/app/contexts/clientContext'
import { useRequestCardContext } from '@/app/contexts/cardContrext'
import { CheckoutServices } from '../services'
import { Span } from 'next/dist/trace'
import { formatToKwanza } from '@/lib/currency'

export default function Payment() {
  const {handlerChangeInputsDelivery,insertCheckout,changeStep,selectLocation} = CheckoutServices()
  const {getClientActive} = CartServices()
  const {ListOrder} = useRequestCardContext()
  const {client} = useClientContext()
  useEffect(()=>{
    (async()=>{
      await getClientActive(client)
    })
  })
  return (
    <>
      <div className='w-full h-40 flex items-center flex-col dark'>
        <span className='w-full text-[#00a5cf] h-20 flex items-center justify-center text-2xl font-base text-center'>
          <h2>Pagamento</h2>
        </span>
        <div className='flex w-full h-20 justify-around '>
          <span className='flex items-center flex-row space-x-4 text-lg'>
            <span>{client.name}</span>
          </span>
          <span className='flex items-center flex-row space-x-4 text-lg'>
            <strong>Total a pagar</strong>
            <span>{formatToKwanza(ListOrder.TotalInvoice)}</span>
          </span>
        </div>
      </div>
      <div className='w-full bg-white h-auto flex justify-center'>
        <div className='w-1/2  max-[750px]:w-full'>
          <PayPal/>
          <Visa/>
        </div>
      </div>
      <div className='flex flex-row w-full p-4 justify-between'>
        <button type='button' className='text-[#00a5cf] w-64 p-2 text-center rounded border' onClick={()=>changeStep(2)}>Voltar</button>
        <span  className='w-64 bg-[#00a5cf] rounded border p-2 text-white space-x-2'>
          Aguardar a sua encomenda
        </span>
      </div>
    </>
    
  )
}
