import { Requests } from "@/app/api"
import { useProductsContext } from "@/app/contexts/productsContext"
import { Product } from "@/app/types/products"
import {  useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"
import { useClientContext } from "@/app/contexts/clientContext"
export const _productService = (()=>{
    const {setProductsView,setProducts} = useProductsContext()
    const {client} = useClientContext()
    const [product,setProduct] = useState<Product>({
        category_product_id: 0,
        company_id: 0,
        description: '',
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
        },
        product_likes:[]
    })
    const { isSignedIn } = useUser();
    const router = useRouter()
    const {routeGet,routePost} = Requests()
    const [image,setImage] = useState<string>('')
    const getProduct = (async(productId: number)=>{
       await routeGet(`product/${productId}`)
        .then((response) => {
            if(response.data.message) return toast.dark(response.data.message,{position: "top-right"})
            setProduct({...response.data})
            setImage(product.image)
            if(response.data.category_product!=null){
                setProductsView(response.data.category_product.produtos)
                setProducts(response.data.category_product.produtos)
            }
        }).catch((err) => {
            console.log(err);
        });
    })
    const changeImage = ((img: string)=>{
        setImage(img)
    })

    const likeAnComment = (async(type:string,product: Product)=>{
        if(!isSignedIn) return router.push('/sign-in')
        if(type == 'like'){
            await routePost('/likeAnComment',{type: type,client: client.id,productId: product.id})
            .then((response) => {
                if (response.data.message) return toast.dark(response.data.message,{position: 'top-right'})
                product = response.data
                setProduct({...product})
            }).catch((err:any) => {
                console.log(err);
                toast.dark(err.response.data.message,{position: 'top-right'})
            });
        }
    })
    return {getProduct,changeImage,image,product,likeAnComment}
})