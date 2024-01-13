import { useClientContext } from '@/app/contexts/clientContext'
import React, { useEffect, useRef, useState } from 'react'
import { CheckoutServices } from '../services'
import { Delivery } from '@/app/types/checkout'
import { IoIosClose } from "react-icons/io";
import { AddressServices } from './services';
import { LuLoader2 } from 'react-icons/lu';
import DrawerModal from '@/app/components/modals';

export default function NewAddress({closeModal,propsAddress}:{propsAddress?: Delivery,closeModal: VoidFunction},) {
  const {handlerChangeInputsDelivery,initMapScript,saveAddress,searchInput,initAutocomplete,setAddresses,address} = AddressServices(closeModal)
  const {client} = useClientContext()
  const [load,setLoad] = useState(false)
  useEffect(()=>{
    if(propsAddress){
      propsAddress.phone = client.phone
      setAddresses({...propsAddress})
    }else{
      address.phone = client.phone
      setAddresses({...address})
    }
    
    initMapScript().then(()=>initAutocomplete())
  },[])

  return (
    <DrawerModal>
      <form onSubmit={(e)=>{saveAddress(e),setLoad(true)}} className='flex-auto relative opacity-100 bg-white z-50 flex-col rounded h-auto max-w-xl'>
        <span onClick={()=>closeModal()} className='absolute right-0 p-2 text-2xl cursor-pointer rounded-full hover:bg-gray-100'>
          <IoIosClose/>
        </span>
        <div className='flex justify-center items-center p-6'>
          <h2>Add a new address</h2>
        </div>
        <span className='px-6 flex'>
          <input type="search" ref={searchInput} id='search' className='w-full p-2 border outline-[#00a5cf] rounded' placeholder='Search your address...'/>
        </span>
        <div className='h-80 overflow-auto p-6'>
          <div className='flex h-auto flex-col rounded '>
            <span className='flex flex-col p-2'>
              <label htmlFor="country" className='flex items-end p-2 text-base font-light'>Pais:</label>
              <input type="text" placeholder='Cidade' defaultValue={address.country} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='country' className=' p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="city" className='flex items-end p-2 text-base font-light'>Cidade:</label>
              <input type="text" placeholder='Cidade' defaultValue={address.city} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='city' className=' p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="County" className='flex items-end p-2 text-base font-light'>Municipio:</label>
              <input type="text" placeholder='Municipio' defaultValue={address.county} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='county' className=' p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="neighborhood" className='flex items-end p-2 text-base font-light'>Bairo:</label>
              <input type="text" placeholder='Bairo' defaultValue={address.neighborhood} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='neighborhood' className='p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="road" className='flex items-end p-2 text-base font-light'>Rua:</label>
              <input type="text" placeholder='Sua ria' defaultValue={address.road} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='road' className='p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="phone" className='flex items-end p-2 text-base font-light'>Phone number:</label>
              <input type="text" placeholder='Phone number ' defaultValue={address.phone} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='phone' className='p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="housNumber" className='flex items-end p-2 text-base font-light'>Numero de casa:</label>
              <input type="text" placeholder='Numero de casa ' defaultValue={address.housNumber} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='housNumber' className='p-2 border outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="comment" className='flex items-end p-2 text-base font-light'>Message:</label>
              <textarea placeholder='Message for about this address. Ex(Leave at my dor) ' defaultValue={address.comment} onChange={(e)=>handlerChangeInputsDelivery(e)} required id='comment' className='p-2 border text-sm outline-[#00a5cf] rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="location" className='flex items-end p-2 text-base font-light'>Mapa:</label>
              <button type="button" disabled id='location' className='p-2 border outline-[#00a5cf] rounded'>{address.localisation != '' ? address.localisation : 'Sua localisação'}</button>
            </span>
          </div>
        </div>
        <div className='flex justify-center items-center p-6'>
          <button type='submit' className='flex flex-row space-x-2 justify-center w-60 p-2 bg-[#00a5cf] text-white rounded-lg text-center'>
            Save address
            {load && <svg className="animate-spin text-white h-5 w-5 mr-3" viewBox="0 0 24 24">
                          <LuLoader2 className="text-2xl"/>
                      </svg>
            }
          </button>
        </div>
      </form>
    </DrawerModal>
  )
}
