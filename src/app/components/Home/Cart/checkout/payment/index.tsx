import React from 'react'
import { useClientContext } from '@/app/contexts/clientContext'
import { CheckoutServices } from '../services'
import { formatToKwanza } from '@/lib/currency'
import CheckoutSession from './session'
import { useUser } from '@clerk/nextjs'
export default function Payment() {
  const { isSignedIn, user, isLoaded } = useUser();
  const {changeStep} = CheckoutServices()
  const {client} = useClientContext()
  return (
    <>
      
      <div className='w-full h-40 flex px-4 items-center flex-col dark'>
        <span className='w-full text-[#00a5cf] h-20 flex items-center justify-center text-2xl font-base text-center'>
          <h2>Pagamento</h2>
        </span>
        {
          client.invoices.length && client.invoices.map((order,index)=>(
            <div key={index} className={`w-full md:w-2/3 space-y-2 sm:w-full xl:w-1/3 text-gray-600 p-2 border rounded`}>
              <div className='flex flex-col'>
                  <div className='flex flex-row space-x-4'>
                      <strong>{`${client.surname} ${client.id}`}</strong>
                      <span>{order.delivery.phone}</span>
                  </div>
                  <span>{order.delivery.country}</span>
                  <span>{`${order.delivery.housNumber}, ${order.delivery.road}, ${order.delivery.city} `}</span>
              </div>
              <div className='flex flex-row justify-between'>
                  <div className='flex flex-row space-x-2'>
                    <span>Total a pagar</span>
                    <span className='font-bold text-xl'>{formatToKwanza(order.TotalInvoice,order.invoice_items[0]?.produto?.company.currencyCompany.code)}</span>
                  </div>
                  <div className='flex flex-row space-x-2'>
                    { isSignedIn && <CheckoutSession client={client} order={order}/>}
                      <button className='text-red-700' type='button'>Preview</button>
                  </div>
              </div>
            </div>
          ))
        }
        
      </div>
      <div className='w-full bg-white h-auto flex justify-center'>
        <div className='w-1/2  max-[750px]:w-full'>
        </div>
      </div>
      <div className='flex flex-row w-full p-4 justify-between'>
        <button type='button' className='text-[#00a5cf] w-64 p-2 text-center rounded border' onClick={()=>changeStep(2,'address')}>Voltar</button>
        <span  className='w-64 bg-[#00a5cf] rounded border p-2 text-white space-x-2'>
          Aguardar a sua encomenda
        </span>
      </div>
    </>
  )
}
