import { Requests } from "@/app/api"
import { useProductsContext } from "@/app/contexts/productsContext"
import { Categories } from "@/app/types/categories"
import { Product } from "@/app/types/products"
import { useState } from "react"

export const CategoryService = (()=>{
    const {setProductsView} = useProductsContext()
    const [category,setCategory] = useState<Categories>({
        id: 0,
        image: '',
        name: '',
        produtos: [],
        sub_categories: []
    })
    const {routeGet} = Requests()
    const GetCategory = (async(categoryId:number)=>{
        routeGet(`/categories/${categoryId}`)
        .then((response) => {
            setCategory({...response.data})
            setProductsView(response.data.produtos)
        }).catch((err) => {
            console.log(err);
        });
    })

    const productsSubcategory = ((products:Product[])=>{
        setProductsView(products)
    })

    return {GetCategory,category,productsSubcategory,setCategory}
})