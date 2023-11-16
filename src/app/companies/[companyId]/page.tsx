import Company from '@/app/components/Home/companies/company'
import { CompanyProvider } from '@/app/contexts/companyContext'
import React from 'react'

export default function page({params}:{params: {companyId: number}}) {
  return (
    <CompanyProvider>
      <Company companyId={params.companyId}/>
    </CompanyProvider>
  )
}
