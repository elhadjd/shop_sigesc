import Link from 'next/link'
import React from 'react'
import { Auth } from './service'
import { useStateProgressContext } from '@/app/contexts/progress'

export default function Register() {
    const {RegisterService,handlerChangeInputsRegister} = Auth()
    const {progress,state} = useStateProgressContext()
  return (
    <div className='w-full mt-10 h-auto flex justify-center items-center'>
        <form onSubmit={RegisterService} className='w-96 max-md border border-red-700 rounded h-full p-4'>
            <span className='flex flex-col p-2'>
              <label htmlFor="name" className='flex items-end w-full p-2 text-lg font-light'>Nome:</label>
              <input type="text" placeholder='Nome' onChange={(e)=>handlerChangeInputsRegister(e)} required id='name' className='w-full p-2 border outline-red-700 rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="email" className='flex items-end w-full p-2 text-lg font-light'>E-mail:</label>
              <input type="email" placeholder='Email' onChange={(e)=>handlerChangeInputsRegister(e)} required id='email' className='w-full p-2 border outline-red-700 rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="password" className='flex items-end w-full p-2 text-lg font-light'>Senha:</label>
              <input type="password" placeholder='Password' onChange={(e)=>handlerChangeInputsRegister(e)} required id='password' className='w-full p-2 border outline-red-700 rounded'/>
            </span>
            <span className='flex flex-col p-2'>
              <label htmlFor="password1" className='flex items-end w-full p-2 text-lg font-light'>Confirmar senha:</label>
              <input type="password" placeholder='Confirmar senha' onChange={(e)=>handlerChangeInputsRegister(e)} required id='password1' className='w-full p-2 border outline-red-700 rounded'/>
            </span>
            <span className='flex flex p-2 justify-center items-center bg-white'>
                <button type='submit' className='outline-0 border rounded p-2 font-bold hover:bg-red-700 hover:text-white text-red-700 border-red-700 w-full'>
                    Confirmar
                    {state == 'registerUser' && progress}
                </button>
            </span>
            <span className='flex justify-end text-red-700 text-base p-2'>
                <Link href={'/auth/login'}>ja tenho conta</Link>
            </span>
        </form>
    </div>
  )
}
