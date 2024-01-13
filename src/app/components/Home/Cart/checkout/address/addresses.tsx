import { useClientContext } from '@/app/contexts/clientContext'
import { Delivery } from '@/app/types/checkout'
import React, { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import NewAddress from './newAddress';
import Confirmation from '@/app/components/modals/confirmation';
import { Requests } from '@/app/api';
import { toast } from 'react-toastify';

export default function Addresses() {
    const {client,setClient} = useClientContext()
    const [modal,setModal] = useState({
        address_id: 0,
        state: false
    })
    const {routeDelete} = Requests()
    const [stateNewAddress,setStateNewAddress] = useState<boolean>(false)
    const [typeFormAddress,setTypeFormAddress] = useState<{data: Delivery,state: number}>({
        data: {
            city: '',
            comment: '',
            country: '',
            county: '',
            housNumber: '',
            id: 0,
            localisation: '',
            neighborhood: '',
            phone: '',
            road: ''
        },
        state: 0
    })
    const ChangeAddress = ((address: Delivery)=>{
        client.default_address = address.id
        setClient({...client})
    })
    

    const closeModal = (()=>{
        setStateNewAddress(false)
    })

    const renderAddressForm = ((type: number,data?: Delivery)=>{
        setStateNewAddress(true),
        typeFormAddress.state = type
        if(data){
            typeFormAddress.data = data
        }
        setTypeFormAddress(typeFormAddress)
    })

    const closeModalConfirmation = (()=>{
        modal.state = false,
        setModal({...modal})
    })

    const showModalConfirmation = ((address: Delivery)=>{
        modal.state = true,
        modal.address_id = address.id
        setModal({...modal})
    })

    const deleteAddress = (async()=>{
        await routeDelete(`/deleteAddress/${modal.address_id}/${client.id}`)
        .then((response) => {
            toast.dark(response.data.message,{position: 'top-right'})
            if(response.data.data && response.data.data != null) setClient({...response.data.data})
        }).catch((err) => {
            console.log(err);
        }).finally(()=>{
            modal.state = false
        });
        
    })

  return (
    <div className='flex-auto flex-col space-y-2 h-auto w-full max-w-md'>
        {modal.state && <Confirmation closeModal={closeModalConfirmation} title={'Do you really want to delete this address?'} description={'When confirming this mode, the address will be deleted, and it will not be possible to recover it.'} confirm={deleteAddress}/>}
        <button type='button' onClick={()=>renderAddressForm(0)} className='flex flex-row space-x-2 items-center text-[#00a5cf]'>
            <IoMdAdd/>
            New address
        </button>
        {
            stateNewAddress ? typeFormAddress.state == 0 ? <NewAddress closeModal={closeModal}/> : <NewAddress closeModal={closeModal} propsAddress={typeFormAddress.data}/> : 
            <div className='w-full text-base font-base p-2 flex-col flex'>
                <div className='flex flex-col space-y-2'>
                    {
                        client.deliveries.map((address,index)=>(
                            <div key={index} className={`${client.default_address == address.id && 'border-4 border-black-400'} text-gray-600 p-2 border rounded`}>
                                <div className='flex flex-col'>
                                    <div className='flex flex-row space-x-2'>
                                        <strong>{client.surname}</strong>
                                        <span>{address.phone} </span>
                                    </div>
                                    <span>{address.county}</span>
                                    <span>{address.city}</span>
                                </div>
                                <div className='flex flex-row justify-between'>
                                    <div className='flex flex-row space-x-2'>
                                        <input onClick={()=>ChangeAddress(address)} value={client.default_address} checked={client.default_address == address.id} className='border-4 border-indigo-600 outline-none bg-black-500 border-black-400' type="radio" name="defaultAddress" id={`${index}`} />
                                        <label className='cursor-pointer truncate' htmlFor={`${index}`}>Define address</label>
                                    </div>
                                    <div className='flex flex-row space-x-2'>
                                        <button className='' type='button' onClick={()=>renderAddressForm(1,address)}>Edit</button>
                                        <button className='text-red-700' type='button' onClick={()=>showModalConfirmation(address)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        }
    </div>
  )
}
