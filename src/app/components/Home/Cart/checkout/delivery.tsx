import React, { useEffect } from 'react'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { CheckoutServices } from './services'
import { useStateProgressContext } from '@/app/contexts/progress'
import { useClientContext } from '@/app/contexts/clientContext'
import Address from './address/addresses'
export default function Delivery() {
  const {insertCheckout,changeStep} = CheckoutServices()
  const {progress,state} = useStateProgressContext()

  return (
    <div>
      <div className='flex flex-row flex-wrap justify-center p-4 h-auto  min-[820px]:space-x-4 max-[600px]:space-y-6'>
        <Address/>
        <div className='flex space-y-2 h-64 w-[300px]'>
          <img src="/delivery/delivery.avif" alt="Delivery" className='h-full w-full'/>
        </div>
      </div>
      <div className='flex flex-row w-full p-4 justify-between'>
        <button type='button' className='text-[#00a5cf] w-64 p-2 text-center rounded border' onClick={()=>changeStep(1,'personal_info')}>Voltar</button>
        <button type='submit' onClick={()=>insertCheckout()} className='w-64 bg-[#00a5cf] rounded border p-2 text-white space-x-2'>
          Confirmar
          {
            state == 'submitCheckout' && progress
          }
        </button>
      </div>
    </div>
  )
}
