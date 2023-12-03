import { ClientTypeScript } from "./client"
import { Product } from "./products"

export interface Company{
    activity_type_id:number,
    activity_type: typeActivity,
    city:string,
    country: string,
    email:string,
    house_number: string,
    id:number,
    image:string,
    manager: number,
    name:string,
    nif:string,
    phone:string,
    currencyCompany: currencyCompanyTs,
    sede:string,
    description:string,
    produtos: Product[],
    companyRattings: companyRatting[]
}

export interface currencyCompanyTs {
    id: number,
    code: string,
    currency: string,
    digits: number,
    number: number,
    company_id: number,
  }

export interface companyRatting{
    company_id: number,
    client_id: number,
    cliente: ClientTypeScript,
    ratting: number,
    comment: string,
    createdAt: string,
    updatedAt: string
}

export interface typeActivity{
    name: string
}