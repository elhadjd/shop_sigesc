import { TypeInvoice } from "."
import { ClientTypeScript } from "./client"

export interface StepsType{
    id: number,
    name:string
}
export interface Checkout{
    step: number,
    client: ClientTypeScript,
}

export interface Delivery{
    id: number,
    city: string,
    county: string,
    neighborhood: string,
    road: string,
    housNumber: string,
    comment: string,
    localisation: string
}
