"use client"
import { linksObj } from '@/app/links'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { PiLockThin } from 'react-icons/pi'
import { CheckoutServices } from './services'
import { useRequestCardContext } from '@/app/contexts/cardContrext'
import { CartServices } from '../services'
import { useUser } from "@clerk/nextjs";


export default function HeaderCheckout() {
  const {steps} = CheckoutServices()
  const {client,setClient} = useRequestCardContext()
  const {getClientActive} = CartServices()
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded) {
      return null;
    }
  
    useEffect(()=>{
      (async()=>{
        if (isSignedIn) {
          const token = localStorage.getItem('clerk-db-jwt') || null
          client.name = user.fullName
          client.email = user.emailAddresses[0].emailAddress
          client.surname = user.firstName
          client.token = token
          client.user_id_clerk = user.id
          client.image = user.imageUrl
          setClient({...client})
          await getClientActive(client)
        }
      })()
    },[])
  return (
    <div className='flex flex-col w-full fixed bg-white z-50 ease-in-out duration-300'>
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
