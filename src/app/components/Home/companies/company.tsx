"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import { CompanyServices } from './services/companyService'
import { LuBoxes } from 'react-icons/lu'
import {GiVibratingShield} from 'react-icons/gi'
import { MdMiscellaneousServices } from 'react-icons/md'
import { RiCustomerService2Fill } from 'react-icons/ri'
import ListProducts from '../products/listProducts'
import ServicesCompany from './servicesCompany'
import CompanyContacts from './companyContacts'
import { Rattings } from './ratting'
import { useCompanyContext } from '@/app/contexts/companyContext'

export default function Company({companyId}:{companyId:number}) {
  const {getCompany,activeComponent,setActiveComponent} = CompanyServices()

  const {company,setCompany} = useCompanyContext()
  
  useEffect(()=>{
    (async()=>{
      await getCompany(companyId)      
    })()
  },[])
  const components:ReactNode[] = [
    <div className='flex flex-row flex-wrap justify-center'>
      <ListProducts key={0}/>
    </div>,
    <ServicesCompany key={1}/>,
    <Rattings key={2}/>,
    <CompanyContacts key={3}/>
  ]

  const changeComponent = ((title:string,index:number)=>{
    activeComponent.step = index
    activeComponent.title = title
    setActiveComponent({...activeComponent})
  })
  

  const buttons: {title:string,icon: ReactNode}[] = [
    {
        title: 'Produtos da empresa',
        icon: <LuBoxes/>
    },
    {
      title: 'Serviços da empresa',
      icon: <MdMiscellaneousServices/>
    },
    {
      title: 'Avaliações da empresa',
      icon: <GiVibratingShield/>
    },
    {
      title: 'Atendimento',
      icon: <RiCustomerService2Fill/>
    },

  ]
  
  return (
    <div className='w-full flex flex-col max-[600px]:p-0 space-y-2 p-8'>
      <div className={`w-full h-80 flex`}>
        <div className='absolute w-1/2 flex justify-center items-center space-x-2 flex-col p-2'>
          <span className='text-2xl font-bold'>{company?.name}</span>
          <p className='text-ellipsis overflow-hidden h-48 text-light font-sm'>{company?.description}</p>
        </div>
        <img className='flex justify-end object-none h-auto w-full' src={`https://geral.sisgesc.net/company/image/${company?.image}`} alt="" />
      </div>
      <div className='w-full flex flex-col space-y-2'>
        <div className='grid grid-cols-4 border rounded w-full space-x-2 p-2 '>
          {
            buttons.map((button,index)=>(
              <div onClick={()=>changeComponent(button.title,index)} key={index} className="flex cursor-pointer hover:scale-125 bg-white flex-col items-center p-3 h-auto w-auto space-y-2 border shadow max-w-md">
                <span className='text-4xl text-[#00a5cf]'>{button.icon}</span>
                <span className='text-lg max-[650px]:truncate max-[650px]:text-sm w-full text-clip'>{button.title}</span>
              </div>
            ))
          }
        </div>
        <div className="w-full mx-auto">
          <details className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
            <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
              {activeComponent.title}
            </summary>
            <div className="mt-3 flex flex-wrap justify-center leading-6">
              {components.map((component,index)=>(
                activeComponent.step === index && <div className='flex justify-center w-full' key={index}>{component}</div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
