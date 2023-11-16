import { Requests } from "@/app/Api"
import { useProductsContext } from "@/app/contexts/productsContext"
import { Product } from "@/app/types/products"
import {  useState } from "react"
import { categoryService } from "../../Hero/categories/service/categoryService"

export const _productService = (()=>{
    const {category} = categoryService()
    const [product,setProduct] = useState<Product>({
        category_product_id: 0,
        company_id: 0,
        estado: 0,
        fabricante: '',
        id: 0,
        image:'',
        imposto: '0',
        nome: '',
        preco_medio:0,
        preçocust: 0,
        preçovenda: 0,
        product_type_id: 0,
        product_pictures:[],
        stocks: [],
        category_product: {
            id: 0,
            image: '',
            nome: '',
            Sub_Categories: [],
            produtos: []
        },
    })
    const {routeGet} = Requests()
    const [image,setImage] = useState<string>('')
    const getProduct = (async(productId: number)=>{
       await routeGet(`product/${productId}`)
        .then((response) => {
            setProduct({...response.data})
            setImage(product.image)
        }).catch((err) => {
            console.log(err);
        });
    })
    const changeImage = ((img: string)=>{
        setImage(img)
    })
    return {getProduct,changeImage,image,product}
})