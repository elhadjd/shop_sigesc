import React, { useEffect } from "react";
import { LuMapPin } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { PiContactlessPayment } from "react-icons/pi";
import { linksObj } from "@/app/links";
import Link from "next/link";
import { useRequestCardContext } from "@/app/contexts/cardContrext";
import { NavBarService } from "./services/navBar";
import {RiArrowDownSLine} from 'react-icons/ri'
import { CartServices } from "../Home/Cart/services";
import { useUser } from "@clerk/nextjs";
import {useClientContext} from '@/app/contexts/clientContext'
import ClientUser from "../client/client";

export default function Bar() {
  const {setStateShow,ListOrder} = useRequestCardContext()
  const {getInvoice,getClientActive} = CartServices()
  const {openMenu,stateMenu} = NavBarService()
  const {client,setClient} = useClientContext()
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
      }else{
        await getInvoice()
      }
    })()
},[])
  return (
    <div className="h-16 border-b border-inherit flex max-[1080px]:relative">
      <div className="flex w-32 max-[700px]:flex-auto p-2 items-center justify-center">
        <Link href={linksObj.home.href}><h2 className="font-bold text-2xl text-[#00a5cf]">SIGESC</h2></Link>
      </div>
      <div className="flex-auto max-[1080px]:flex-auto max-[1080px]:w-64 p-2">
        <span className="relative flex f-2 items-center justify-center">
          <input
            type="search"
            placeholder="O que esta precurando"
            className="w-full rounded-md p-2 outline-0 text-base focus:border-dotted border-2"
          />
          <FiSearch className="absolute text-2xl right-3 text-blue-950" />
        </span>
      </div>
      <div className={`flex-auto w-64 flex max-[1080px]:top-16 ${ !stateMenu ? 'max-[1080px]:hidden' : 'max-[1080px]:visible'} max-[1080px]:right-0 max-[1080px]:flex-col max-[1080px]:bg-white max-[1080px]:z-20 max-[1080px]:shadow max-[1080px]:absolute justify-center text-blue-950 text-base md:max-w-2xl`}>
        <div className="flex-auto p-3 flex h-full items-center justify-center hover:cursor-pointer hover:text-[#00a5cf] max-[1080px]:justify-start">
          <Link className="flex" href={linksObj.cart.href}>
            <LuMapPin className="text-2xl" />
            <span className="ml-2">{linksObj.cart.label}</span>
          </Link>
        </div>
        <div className="flex-auto p-3 flex h-full items-center justify-center hover:cursor-pointer hover:text-[#00a5cf] max-[1080px]:justify-start">
           <Link className="flex" href={linksObj.contact.href}>
              <BsTelephone className="text-2xl" />
              <span className="ml-2">{linksObj.contact.label}</span>
           </Link>
        </div>
        <div className="flex-auto p-3 flex h-full items-center justify-center hover:cursor-pointer hover:text-[#00a5cf] max-[1080px]:justify-start">
            <Link className="flex" href={linksObj.payments.href}>
              <PiContactlessPayment className="text-2xl" />
              <span className="ml-2">{linksObj.payments.label}</span>
            </Link>
        </div>
        <ClientUser/>
      </div>
      <div className={`flex w-32 p-3 h-full md:flex-column space-x-6 justify-center items-center max-[600px]:w-12 max-[1080px]:ml-3 max-[1080px]:justify-self-end`}>
        <span onClick={()=>setStateShow(true)} className="relative flex items-center hover:cursor-pointer">
          <BiShoppingBag className="absolute right-3 text-2xl" />
          <span className="bg-[#00a5cf] z-10 text-white h-5 w-5 flex items-center justify-center rounded-full">
            {ListOrder.invoice_items.length | 0}
          </span>
        </span>
        <button type="button" className="min-[1080px]:hidden text-xxl font-xl" onClick={openMenu}>
            <RiArrowDownSLine className="text-[#00a5cf] text-xxl"/>
        </button>
      </div>
    </div>
  );
}
