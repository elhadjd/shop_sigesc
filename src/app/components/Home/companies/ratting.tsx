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
    <div className='flex flex-col w-full space-y-4 items-center justify-center'>
      <Typography className='font-bold' component="legend">Avaliar a empresa</Typography>
      <form onSubmit={(e)=>handlerSubmitRatting(e,company.id)} className='flex flex-col space-y-2'>
        <Rating
          name="simple-controlled"
          value={form.ratting}
          onChange={(value,newValue)=>changeForm('ratting',newValue)}
        />
        <textarea className='w-md w-80 p-2 max-h-32 min-h-32 border outline-none' required value={form.comment} onChange={(e)=>changeForm('comment',e.target.value)} name="comment" id="comment"></textarea>
        <Button type='submit' variant="contained">Enviar</Button>
      </form>
      {
        company.companyRattings.reverse().map((data,index)=>(
          <div key={index} className='flex flex-col w-full border-b p-4'>
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