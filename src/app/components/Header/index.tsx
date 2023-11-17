"use client"
import React from 'react'
import Categories from './categories'
import HeaderBar from './bar'
import Cart from '../Home/Cart'
import { useRequestCardContext } from '@/app/contexts/cardContrext'
import { usePathname } from 'next/navigation'
import HeaderCheckout from '../Home/Cart/checkout/header'

export default function Header() {
  const {stateShow} = useRequestCardContext()
  const pathname = usePathname()
  return (
    <>
    {
      pathname == '/checkout' ? (<HeaderCheckout/>):
      pathname != '/checkout' && 
        (<div className="w-full fixed bg-white z-50 flex flex-col ease-in-out duration-300">
          <HeaderBar/>
          <Categories/>
          {stateShow && (<Cart/>)}
        </div>)
      }
    </>
  )
}
