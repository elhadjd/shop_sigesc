import { useCompanyContext } from '@/app/contexts/companyContext'
import { Button } from '@mui/material'
import React from 'react'
import { CompanyContactService } from './services/companyContact'
import { useStateProgressContext } from '@/app/contexts/progress'
import { InputsTs } from '@/app/types/inputs'

export default function CompanyContacts() {
    const {company,setCompany} = useCompanyContext()
    const {handlerSendMessage,inputs,form,handlerChangeInput} = CompanyContactService()
    const {progress,state} = useStateProgressContext()
  return (
    <div className='w-full h-auto p-4 bg-white flex flex-row'>
        <div className='flex flex-col justify-around w-1/2'>
            <div className='flex flex-col space-y-2 justify-center'>
                <h2 className='text-xl'>Formulario de contacto</h2>
                <span>{company.country} , {company.city} </span>
            </div>
            <div className='flex flex-col'>
                <span>Email: {company.email}</span>
                <span>Telefone: {company.phone} </span>
            </div>
        </div>
        <form onSubmit={handlerSendMessage} className='w-1/2'>
            <div className='flex justify-center text-xl'>
                <h2>Formulario de contacto</h2>
            </div>
            <div className='p-2 flex flex-col space-y-2'>
                {
                    inputs.map((input,index)=>(
                        <input key={index} onChange={(e)=>handlerChangeInput(e)} required className='p-2 border outline-0 rounded bg-gray-100' type={input.type} id={input.id} placeholder={input.placeholder} />
                    ))
                }
                <textarea id='message' required value={form.message} className='p-2 border outline-0 rounded bg-gray-100 max-h-[200px]' onChange={(e)=>handlerChangeInput(e)} placeholder='Mensagen'></textarea>
            </div>
            <button className='bg-[#00a5cf] w-28 flex space-x-2 p-2 justify-center text-white border rounded' type='submit'>
                Enviar
                {state === 'smsCompany' && progress}
            </button>
        </form>
    </div>
  )
}
