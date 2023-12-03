import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import currencyCodes from 'currency-codes'
import { useClientContext } from '@/app/contexts/clientContext';
import { CartServices } from '../Home/Cart/services';
export default function ChangeCurrency() {
    const {changeCurrencyClient} = CartServices()
    const allCurrencies = currencyCodes.data;
    const [money,setMoney] = useState(allCurrencies)
   const {client} = useClientContext()
    const searchCurrency = ((text:string)=>{  
        const search = allCurrencies.filter((money)=>{
            return money.currency.toLocaleLowerCase().includes(text.toLocaleLowerCase())
        })
        setMoney(search)
    })

  return (
    <div className='relative '>
        
        {
            client.currencyClient ? (<span className="text-base">{client.currencyClient.code}</span>):<MdOutlineAttachMoney/>
        }
        <div className='absolute flex flex-col space-y-2 bg-white z-20 text-gray-800 mr-8 w-40 mt-4 h-96 max-w-md'>
            <input type="text" onChange={(e)=>searchCurrency(e.target.value)} className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1' placeholder='Moeda'/>
            <div className='w-full h-full overflow-auto'>
                {
                    money.map((currency)=>(
                        <div key={currency.number} onClick={()=>changeCurrencyClient(currency)} className={`flex flex-row p-1 justify-between w-full hover:bg-[#00a5cf] hover:text-white ${client.currencyClient && client.currencyClient.code == currency.code && 'bg-[#00a5cf] text-white'}`}>
                            <span className='w-1/2 truncate text-start text-sm font-sm'>{currency.currency}</span>
                            <span className=' text-base text-start w-1/3 font-sm'>{currency.code}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}
