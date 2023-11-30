"use client"
import { linksObj } from '@/app/links'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { PiLockThin } from 'react-icons/pi'
import { CheckoutServices } from './services'
import { CartServices } from '../services'
import { useUser } from "@clerk/nextjs";
import { BiCheckCircle } from 'react-icons/bi'
import { useCheckoutContext } from '@/app/contexts/checkout'
import { useClientContext } from '@/app/contexts/clientContext'
import { useRouter } from 'next/navigation'

export default function HeaderCheckout() {
  const {steps} = CheckoutServices()
  const {client,setClient} = useClientContext()
  const {getClientActive} = CartServices()
  const { isSignedIn, user, isLoaded } = useUser();
  const {checkout} = useCheckoutContext()
  const router = useRouter()
  if (!isLoaded) {
    return null;
  }

  useEffect(()=>{
    (async()=>{
      if (!isSignedIn) return router.push('/sign-in')
      if (isSignedIn) {
        const token = localStorage.getItem('clerk-db-jwt') || null
        client.name = user.fullName || ''
        client.email = user.emailAddresses[0].emailAddress
        client.surname = user.firstName || ''
        client.token = token
        client.user_id_clerk = user.id
        client.image = user.imageUrl
        setClient({...client})
        await getClientActive(client)
      }
    })()
  },[user])

  return (
    <div className='flex flex-col w-full fixed bg-white z-50 ease-in-out duration-300'>
      <div className='flex relative h-32 border-b max-[750px]:flex-col w-full border-inherit'>
        <div className='flex z-50 w-1/4 p-4 h-full flex items-center'>
          <Link className='flex-auto justify-center' href={linksObj.home.href}>
            <h2 className='flex justify-center font-bold text-3xl text-[#00a5cf]'>SIGESC</h2>
          </Link>
        </div>
        <div className='flex justify-between space-x-1 max-[550px]:text-sm max-[750px]:space-x-1 max-[750px]:space-x-4 max-[750px]:justify-center max-[750px]:w-full text-lg p-4 w-3/4 h-full flex items-center'>
          {
            steps.map((item)=>(
              <div key={item.id} className='flex flex-row items-center space-x-1'>
                <span>
                  {
                    checkout.step >= item.id ? (<BiCheckCircle className="text-[#00a5cf]"/>) : item.id
                  }
                </span>
                <span>{item.name}</span>
              </div>
            ))
          }
        </div>
        <div className='flex w-1/4 max-[750px]:absolute max-[750px]:w-full max-[750px]:p-4 max-[750px]:justify-end mt-1 mr-1 flex space-x-2 justify-center items-center'>
          <PiLockThin className="text-3xl text-[#00a5cf]"/>
          <p>Ambiente seguro</p>
        </div>
      </div>
    </div>
  )
}
