import React, { useEffect } from 'react'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { CheckoutServices } from './services'
import { useStateProgressContext } from '@/app/contexts/progress'
import { useClientContext } from '@/app/contexts/clientContext'
export default function Delivery() {
  const {handlerChangeInputsDelivery,insertCheckout,changeStep,selectLocation,location} = CheckoutServices()
  const {delivery} = useClientContext()
  const {progress,state} = useStateProgressContext()

  return (
    <form onSubmit={insertCheckout}>
      <div  className='flex flex-row flex-wrap justify-center p-4 h-auto  min-[820px]:space-x-4 max-[600px]:space-y-6'>
        <div className='flex space-y-2 h-96  w-[600px]'>
          <img src="/delivery/delivery.avif" alt="Delivery" className='h-full w-full'/>
        </div>
        <div className='flex-auto flex-col space-y-2 h-auto w-96 max-w-md'>
          <span className='flex justify-center items-center space-x-2'>
            <BsFillPersonVcardFill className="text-2xl text-[#00a5cf]"/>
            <h3 className='p-2 text-center text-base font-leght'>Dados da entega</h3>
          </span>
          <div className='flex h-auto flex-col border p-2 border-[#00a5cf] rounded '>
            <span className='flex flex-row p-2'>
              <label htmlFor="city" className='flex items-end w-1/4 p-2 text-lg font-light'>Cidade:</label>
              <input type="text" placeholder='Cidade' defaultValue={delivery.city} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='city' className='w-3/4 p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="County" className='flex items-end w-1/4 p-2 text-lg font-light'>Municipio:</label>
              <input type="text" placeholder='Municipio' defaultValue={delivery.county} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='county' className='w-3/4 p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="neighborhood" className='flex items-end w-1/4 p-2 text-lg font-light'>Bairo:</label>
              <input type="text" placeholder='Bairo' defaultValue={delivery.neighborhood} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='neighborhood' className='w-3/4 p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="road" className='flex items-end w-1/4 p-2 text-lg font-light'>Rua:</label>
              <input type="text" placeholder='Sua ria' defaultValue={delivery.road} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='road' className='w-3/4 p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="housNumber" className='flex items-end w-1/4 p-2 text-lg font-light'>Numero de casa:</label>
              <input type="text" placeholder='Numero de casa ' defaultValue={delivery.housNumber} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='housNumber' className='w-3/4 p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="location" className='flex items-end w-1/4 p-2 text-lg font-light'>Mapa:</label>
              <button type="button" onClick={selectLocation} id='location' className='w-3/4 p-2 border outline-[#00a5cf] rounded'>{location != '' ? location : 'Sua localisação'}</button>
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full p-4 justify-between'>
        <button type='button' className='text-[#00a5cf] w-64 p-2 text-center rounded border' onClick={()=>changeStep(1)}>Voltar</button>
        <button type='submit' className='w-64 bg-[#00a5cf] rounded border p-2 text-white space-x-2'>
          Confirmar
          {
            state == 'submitCheckout' && progress
          }
        </button>
      </div>
    </form>
  )
}
