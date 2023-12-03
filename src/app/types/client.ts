import { TypeInvoice } from "."
import { Delivery } from "./checkout"

export interface ClientTypeScript{
    id: number
    company_id: number,
    image: string | '',
    surname: string | '',
    name: string | '',
    email: string | '',
    whatssap: string,
    phone: string,
    city: string,
    country: string,
    rua: string,
    state: string,
    invoices: TypeInvoice[]
    delivery: Delivery,
    currencyClient: currencyClientTs,
    token: string | null,
    user_id_clerk: string | ''
}

export interface currencyClientTs {
    id: number,
    code: string,
    currency: string,
    digits: number,
    number: number,
    client_id: number,
  }