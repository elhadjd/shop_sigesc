import { Requests } from "@/app/Api"
import { useProductsContext } from "@/app/contexts/productsContext"
import { Product } from "@/app/types/products"
import {  useState } from "react"

export const _productService = (()=>{
    const {productsView,setProductsView} = useProductsContext()
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
            name: '',
            sub_categories: [],
            produtos: []
        },
        company: {
            activity_type: {
                name: ''
            },
            activity_type_id: 0,
            city: '',
            companyRattings: [],
            country: '',
            description: '',
            email: '',
            house_number:'',
            id: 0,
            image: '',
            manager: 0,
            name:'',
            nif: '',phone:'',
            produtos: [],
            sede:'',
            currencyCompany:{
                code: '',
                company_id:0,
                currency:'',
                digits:2,
                id:0,
                number:0
            }
        }
    })
    const {routeGet} = Requests()
    const [image,setImage] = useState<string>('')
    const getProduct = (async(productId: number)=>{
       await routeGet(`product/${productId}`)
        .then((response) => {
            setProduct({...response.data})
            setImage(product.image)
            if(response.data.category_product!=null)setProductsView({...response.data.category_product.produtos})
        }).catch((err) => {
            console.log(err);
        });
    })
    const changeImage = ((img: string)=>{
        setImage(img)
    })
    return {getProduct,changeImage,image,product}
})