"use client"
import { useRequestCardContext } from '@/app/contexts/cardContrext'
import { formatToKwanza } from '@/lib/currency'
import {FiDelete} from 'react-icons/fi'
import { AiOutlineClose } from 'react-icons/ai'
import { CartServices } from './services'
import { useStateProgressContext } from '@/app/contexts/progress' 
import Link from 'next/link'
import { useClientContext } from '@/app/contexts/clientContext'

export default function Cart() {
    const {setStateShow,ListOrder} = useRequestCardContext()
    const {removeItem} = CartServices()
    const {progress,state} = useStateProgressContext()
    return (
        <>
        <div className='fixed flex flex-col w-96 max-[600px]:w-full h-full mt-0 bg-white z-30 right-0'>
            <div className='relative w-full h-full bg-gray-50' dir='ltr'>
                <div className='grid grid-flow-col justify-stretch bg-white h-16 w-full p-4 items-center'>
                    <span onClick={()=>setStateShow(false)} className='flex justify-center'>
                        <AiOutlineClose/>
                    </span>
                    <h3 className='text-lg font-bold text-blue-950'>A sua lista de compras</h3>
                </div>
                <div className='flex flex-col overflow-auto scroll-m-0 snap-y p-4 h-[75%] space-y-3'>
                    {
                        ListOrder.invoice_items.map((item,index)=>(
                        <div key={index} className='flex h-26 justify-between scroll-ms-6 snap-end items-center space-x-2 p-1 drop-shadow-lg rounded bg-white'>
                            <img src={`https://geral.sisgesc.net/produtos/image/${item.produto.image}`} alt="" className=' w-[55px] rounded'/>
                            <div className='flex space-y-1 flex-col w-64 between'>
                                <span>{item.produto.nome}</span>
                                <div className='flex justify-between w-full'>
                                    <span>{item.quantity},00Un(s) </span> X 
                                    <span>{formatToKwanza(item.PriceSold,item.produto.company.currencyCompany.code)}</span>
                                </div>
                                <strong className='w-full flex justify-end'>{formatToKwanza(item.TotalSold,item.produto.company.currencyCompany.code)} </strong>
                                <Link href={`/companies/${item.produto.company.id}`} className='w-48 font-sm text-base truncate'>{item.produto.company.name}</Link>
                            </div>
                            <span onClick={()=>state == '' &&removeItem(item.id)} className='flex p-3 font-sm text-lg text-gray-300 hover:text-gray-600 ease-in duration-150 cursor-pointer rounded-full bg-gray-50 hover:text-xl'>
                                {
                                    state == `deleteItem${item.id}` ? progress : 
                                    <FiDelete/>
                                }
                            </span>
                        </div>
                        ))
                    }
                </div>
                <div className='flex space-x-4 justify-stretch absolute bottom-0 bg-white right-0 h-20 w-full p-3 items-center'>
                    <div className='flex flex-col w-1/2'>
                        <strong className='flex'>
                            Total:
                        </strong>
                        <h3 className='text-lg font-bold'>{formatToKwanza(ListOrder.TotalInvoice,ListOrder.invoice_items[0] ?ListOrder.invoice_items[0].produto?.company.currencyCompany.code : 'USD')}</h3>
                    </div>
                    <Link href={'/checkout'} className='flex w-1/2 justify-center items-center bg-[#00a5cf] p-3 rounded text-white font-bold'>Finalizar compra</Link>
                </div>
            </div>
        </div>
        </>
    )
}