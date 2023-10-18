import { TypeInvoice } from "."

export interface StepsType{
    id: number,
    name:string
}
export interface Checkout{
    step: number,
    invoice: TypeInvoice,
    information: InformationCheckout,
    delivery: Delivery,
}

export interface InformationCheckout{
    email: string,
    surname: string,
    name: string,
    phone: string,
    note: string
}

export interface Delivery{
    country: string,
    city: string,
    neighborhood: string,
    road: string,
    housNumber: string
}
