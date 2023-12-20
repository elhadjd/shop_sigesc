import { Categories } from "./categories"
import { Company } from "./company"

export interface Product{
    id:number,
    description: string,
    nome: string,
    company_id: number,
    image: string,
    category_product_id: number,
    product_type_id: number,
    fabricante: string,
    preçocust: number,
    imposto: string,
    preçovenda: number,
    preco_medio: number,
    company: Company,
    estado: number,
    stocks: Stock[],
    product_pictures: Product_picture[],
    category_product: Categories,
    product_likes: productLikes[]
}

export interface productLikes{
    client_id: number,
    product_id: number,
}

export interface Stock{
    id:number,
    armagen_id: number,
    produtos_id: number,
    quantity: number
}

export interface Product_picture{
    id:number,
    image: string,
    product_id: number,
    createdAt: string,
    updatedAt: string
}

