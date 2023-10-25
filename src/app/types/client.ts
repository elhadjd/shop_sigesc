import { TypeInvoice } from "."

export interface ClientTypeScript{
    id: number
    company_id: number,
    image: string,
    surname: string,
    name: string,
    email: string,
    whatssap: string,
    phone: string,
    city: string,
    country: string,
    rua: string,
    state: string,
    invoices: TypeInvoice
    password: string
}