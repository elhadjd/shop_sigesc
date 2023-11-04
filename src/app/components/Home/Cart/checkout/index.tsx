"use client"
import { useRequestCardContext } from '@/app/contexts/cardContrext'
import { formatToKwanza } from '@/lib/currency'
import React from 'react'
import { CartServices } from '../services'
import Link from 'next/link'
import { linksObj } from '@/app/links'
import { useStateProgressContext } from '@/app/contexts/progress'
import { CheckoutServices } from './services'

export default function ReviewCart() {
  const {ListOrder} = useRequestCardContext()
  const {addItem} = CartServices()
  const {steps,changeStep} = CheckoutServices()
  const {progress,state} = useStateProgressContext()
  return (
    <form className='w-full p-4' onSubmit={(e)=>changeStep(1,e)}>
      <table className='table-auto w-full'>
        <thead>
          <tr>
            <th className='text-start'>Produto</th>
            <th className='text-start'>Preço</th>
            <th className='text-start'>Quantidade</th>
            <th className='text-start'>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            ListOrder.invoice_items.map((item,index)=>(
              <tr key={index}>
                <td className='p-4 flex items-center space-x-4'>
                  <span className=' w-[55px] rounded'>
                    <img src={`https://geral.sisgesc.net/produtos/image/${item.produto.image}`} alt='' className='h-auto'/>
                  </span>
                  <span>{item.produto.nome}</span>
                </td>
                <td>{formatToKwanza(item.PriceSold)} </td>
                <td>
                  <div className='h-full space-x-2 flex w-36 items-center'>
                    <button type='button' onClick={()=>addItem(item.produto,-1)} className='p-2 rounded text-red-700'>-</button>
                    <input type="text" defaultValue={item.quantity} placeholder='Quantidade' onChange={(e)=>item.quantity = Number(e.target.value)} onBlur={(e)=>addItem(item.produto,Number(e.target.value),'checkout')} className='w-16 text-center border outline-0 rounded'/>
                    <button type='button' onClick={()=>addItem(item.produto,1)} className='p-2 rounded text-red-700'>+</button>
                  </div>
                </td>
                <td>{formatToKwanza(item.TotalSold)}</td>
                <td>
                  {state == `addItem${item.produto.id}` && progress}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className='w-full flex items-end flex-col text-base font-bold'>
        <div className='flex w-64 h-20 justify-between items-center border-b'>
          <strong>Subtotal: </strong>
          <span>{formatToKwanza(ListOrder.TotalMerchandise)}</span>
        </div>
        <div className='flex w-64 h-20 items-center justify-between'>
          <strong>Total: </strong>
          <span>{formatToKwanza(ListOrder.TotalInvoice)}</span>
        </div>
      </div>
      <div className='flex p-4 h-20 justify-between items-center'>
        <Link href={linksObj.products.href} className='border border-red-700 flex p-2 rounded text-red-700 text-base w-64 justify-center'>Continuar a comprar</Link>
        <button type='submit' className='bg-red-700 flex p-2 rounded text-white text-base w-64 justify-center'>Finalizar compra</button>
      </div>
    </form>
  )
}
