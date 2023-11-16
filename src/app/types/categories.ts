import { Product } from "./products"

export interface Categories{
    id: number,
    name: string,
    image: string,
    sub_categories: SubCategory[],
    produtos?: Product[]
}
export interface SubCategory{
    name: string
}