export interface Product{
    id:number,
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
    estado: number,
    stocks: Stock[],
    product_pictures: Product_picture[],
    category_product: Category_product
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

export interface Sub_Category{
    id:number,
    name: string,
    image: string,
    category_id: number,
    createdAt: string,
    updatedAt: string
}

export interface Category_product{
    id:number,
    nome: string,
    image: string,
    produtos: Product[]
    Sub_Categories: Sub_Category[]
}
