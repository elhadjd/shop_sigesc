import * as React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { RattingServices } from './services/ratting';
import { Button } from '@mui/material';
import { useCompanyContext } from '@/app/contexts/companyContext';
import { formatDate } from '@/lib/date';

export function Rattings() {
  const {company,setCompany} = useCompanyContext()  
  const {handlerSubmitRatting,changeForm,form,setForm} = RattingServices()
  return (
    <div className='flex flex-col w-full max-w-md space-y-4 items-center justify-center'>
      <Typography className='font-bold' component="legend">Avaliar a empresa</Typography>
      <form onSubmit={(e)=>handlerSubmitRatting(e,company.id)} className='flex flex-col justify-center space-y-2'>
        <Rating
          name="simple-controlled"
          className='flex w-auto'
          value={form.ratting}
          onChange={(value,newValue)=>changeForm('ratting',newValue)}
        />
        <label htmlFor="comment"></label>
        <textarea className='w-md w-80 p-2 max-h-32 min-h-32 border outline-none' required value={form.comment} onChange={(e)=>changeForm('comment',e.target.value)} name="comment" id="comment"></textarea>
        <button type='submit' className='bg-[#00a5cf] p-2 text-white border rounded'>Enviar</button>
      </form>
      {
        company.companyRattings.reverse().map((data,index)=>(
          <div key={index} className='flex flex-col w-full border-b p-4'>
            <div className='flex mb-2 flex-row justify-between items-center'>
              <img src={data.cliente.image} alt="" className='w-10 h-10 rounded-full'/>
              <span className='text-sm font-sm truncate w-2/3 text-start'>{data.cliente.name}</span>
            </div>
            <span className='flex flex-row space-x-2'>
              <Rating name="read-only" value={data.ratting} readOnly />
              <p>{formatDate(data.createdAt)}</p>
            </span>
            <span className='text-sm font-light'>{data.comment}</span>
          </div>
        ))
      }
    </div>
  )
}