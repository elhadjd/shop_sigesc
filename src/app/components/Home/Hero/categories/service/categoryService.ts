import { Requests } from "@/app/Api"
import { Categories } from "@/app/types/categories"
import { useState } from "react"

export const categoryService = (()=>{
    const [category,setCategory] = useState<Categories>({
        id: 0,
        image: '',
        name: '',
        produtos: [],
        sub_categories: []
    })
    const {routeGet} = Requests()
    const getCategory = (async(categoryId:number)=>{
        routeGet(`/categories/${categoryId}`)
        .then((response) => {
            setCategory({...response.data})
        }).catch((err) => {
            console.log(err);
        });
    })
    return {getCategory,category}
})