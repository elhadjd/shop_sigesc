import { useCheckoutContext } from '@/app/contexts/checkout'
import { formatToKwanza } from '@/lib/currency'
import React from 'react'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { FaRegCommentAlt } from 'react-icons/fa'
import {LiaFileInvoiceDollarSolid} from 'react-icons/lia'
import { CheckoutServices } from './services'
export default function InfoClient() {
  const {checkout} = useCheckoutContext()
  const {handlerChangeInputsInfo,handlerChangeInputsDelivery,changeStep} = CheckoutServices()
  return (
    <form onSubmit={(e)=>changeStep(2,e)}>
      <div className='flex flex-row flex-wrap justify-center p-4 h-auto  min-[820px]:space-x-4 max-[600px]:space-y-6'>
        <div className='flex flex-col space-y-2 h-96 w-96 max-w-md'>
          <span className='flex justify-center items-center space-x-2'>
            <BsFillPersonVcardFill className="text-2xl text-red-700"/>
            <h3 className='p-2 text-center text-base font-leght'>Dados Pesual</h3>
          </span>
          <div className='flex h-full flex-col border p-2 border-red-700 rounded '>
            <span className='flex flex-row p-2'>
              <label htmlFor="email" className='flex items-end w-1/4 p-2 text-lg font-light'>E-mail:</label>
              <input type="email" placeholder='Digite seu email' defaultValue={checkout.client.email} required id='email' onChange={(e)=>handlerChangeInputsInfo(e)} className='w-3/4 p-2 border outline-red-700 rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="name" className='flex items-end w-1/4 p-2 text-lg font-light'>Nome:</label>
              <input type="text" placeholder='Nome' id='name' defaultValue={checkout.client.name} required onChange={(e)=>handlerChangeInputsInfo(e)} className='w-3/4 p-2 border outline-red-700 rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="surname" className='flex items-end w-1/4 p-2 text-lg font-light'>Apelido:</label>
              <input type="text" placeholder='Apelido' defaultValue={checkout.client.surname} required onChange={(e)=>handlerChangeInputsInfo(e)} id='surname' className='w-3/4 p-2 border outline-red-700 rounded'/>
            </span>
            <span className='flex flex-row p-2'>
              <label htmlFor="phone" className='flex items-end w-1/4 p-2 text-lg font-light'>Telefone:</label>
              <input type="text" placeholder='Telefone' id='phone' defaultValue={checkout.client.phone} onChange={(e)=>handlerChangeInputsInfo(e)} required className='w-3/4 p-2 border outline-red-700 rounded'/>
            </span>
          </div>
        </div>
        <div className='flex flex-col space-y-2 h-96 w-96 max-w-md'>
          <span className='flex justify-center items-center space-x-2'>
            <FaRegCommentAlt className="text-2xl text-red-700"/>
            <h3 className='p-2 text-center text-base font-leght'>Dados Pesual</h3>
          </span>
          <div className='flex h-full flex-col border p-4 border-red-700 rounded '>
            <label htmlFor="comment" className='h-full w-full'>
              <textarea name="comment" onChange={(e)=>handlerChangeInputsDelivery(e)} defaultValue={checkout.delivery.comment} className='w-full h-40 max-h-full rounded-md p-2 outline-0 text-base focus:border-dotted focus:border-red-700 text-light font-min border ' id="comment"></textarea>
            </label>
          </div>
        </div>
        <div className='flex flex-col space-y-2 relative h-96 w-96 max-w-md'>
          <span className='flex justify-center items-center space-x-2'>
            <LiaFileInvoiceDollarSolid className="text-2xl text-red-700"/>
            <h3 className='p-2 text-center text-base font-leght'>Dados Pesual</h3>
          </span>
          <div className='flex h-80 pb-20 flex-col border p-4 rounded overflow-auto'>
            {
              checkout.client.invoices.invoice_items.map((item,index)=>(
                <div className=' flex flex-row w-full h-32 border-b'>
                  <span className='flex items-center w-18 h-28'>
                    <img src={`https://geral.sisgesc.net/produtos/image/${item.produto.image}`} className="w-auto h-24" alt="" />
                  </span>
                  <span className='flex p-2 w-full text-light font-base flex-row items-center space-x-2'>
                    <h3 className='w-3/5'>{item.produto.nome} </h3>
                    <span className='w-2/5 flex justify-end'>{formatToKwanza(item.TotalSold)} </span>
                  </span>
                </div>
              ))
            }
          </div>
          <div className="flex absolute bottom-5 p-4 bg-white w-[92%] text-light items-center justify-between text-lg font-base ml-2 h-16">
            <p>Total:</p>
            <span>{formatToKwanza(checkout.client.invoices.TotalInvoice)}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full p-4 justify-between'>
        <button className='text-red-700 w-64 text-center p-2 rounded border' type='button' onClick={()=>changeStep(0)}>Voltar</button>
        <button type='submit' className='rounded click:outline-red-700 bg-red-700 text-white p-2 w-64'>Ir para entrega</button>
      </div>
    </form>
    
  )
}
