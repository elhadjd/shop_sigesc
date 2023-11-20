import React from 'react'
import { OurService } from './service/ourServices'

export default function OurServices() {
    const {companyServices} = OurService()
  return (
    <div className='flex flex-wrap h-full items-center justify-center max-[500px]:px-10 max-[1100px]:px-14 max-[500px]:space-x-0 pb-4 space-x-6 space-y-4 gap-3 px-20 max-[700px]:pr-16 max-[700px]:pl-16'>
        {
            companyServices.map((service,index)=>(
                <div key={index} className='flex flex-col h-full w-64 max-[500px]:w-full space-y-4'>
                    <div className='flex items-center justify-center h-64 w.full'>
                        <img src={service.image} alt={service.name} className='h-full w-full' />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <span className='font-base uppercase'>{service.name}</span>
                        <span className='text-ellipsis overflow-hidden text-sm font-base h-10'>{service.description}</span>
                        <button type="button" className='button-danger'>Ver mais</button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
